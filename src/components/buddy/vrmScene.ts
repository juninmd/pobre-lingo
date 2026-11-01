import { type VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import {
	AmbientLight,
	Clock,
	DirectionalLight,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export type VrmScene = {
	load(url: string): Promise<void>;
	setSpeaking(speaking: boolean): void;
	setMood(mood: "neutral" | "happy" | "sad"): void;
	dispose(): void;
};

/** Mão para baixo, em vez da pose T padrão do VRM. */
function relaxArms(vrm: VRM) {
	const humanoid = vrm.humanoid;
	const left = humanoid.getNormalizedBoneNode("leftUpperArm");
	const right = humanoid.getNormalizedBoneNode("rightUpperArm");
	if (left) left.rotation.z = -1.3;
	if (right) right.rotation.z = 1.3;
}

/** Cena Three.js mínima: busto da personagem, piscar, respirar e boca sincronizada com a fala. */
export function createVrmScene(canvas: HTMLCanvasElement): VrmScene {
	const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	const scene = new Scene();
	const camera = new PerspectiveCamera(28, 1, 0.1, 20);
	camera.position.set(0, 1.35, 2.1);
	camera.lookAt(0, 1.3, 0);
	const sun = new DirectionalLight(0xffffff, Math.PI);
	sun.position.set(1, 1.5, 2);
	scene.add(sun, new AmbientLight(0xffffff, 0.9));

	const clock = new Clock();
	let vrm: VRM | null = null;
	let speaking = false;
	let mood: "neutral" | "happy" | "sad" = "neutral";
	let nextBlink = 2;
	let frame = 0;

	const resize = () => {
		const { clientWidth: w, clientHeight: h } = canvas;
		if (!w || !h) return;
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	};
	const observer = new ResizeObserver(resize);
	observer.observe(canvas);

	const animate = () => {
		frame = requestAnimationFrame(animate);
		const delta = clock.getDelta();
		const time = clock.elapsedTime;
		if (vrm) {
			const expr = vrm.expressionManager;
			if (expr) {
				const mouth = speaking
					? 0.25 + 0.45 * Math.abs(Math.sin(time * 11))
					: 0;
				expr.setValue("aa", mouth);
				expr.setValue("happy", mood === "happy" ? 0.7 : 0);
				expr.setValue("sad", mood === "sad" ? 0.6 : 0);
				const blinking = time > nextBlink && time < nextBlink + 0.15;
				expr.setValue("blink", blinking ? 1 : 0);
				if (time > nextBlink + 0.15) nextBlink = time + 2 + Math.random() * 3;
			}
			const chest = vrm.humanoid.getNormalizedBoneNode("chest");
			if (chest) chest.rotation.x = Math.sin(time * 1.6) * 0.015;
			const head = vrm.humanoid.getNormalizedBoneNode("head");
			if (head) head.rotation.y = Math.sin(time * 0.7) * 0.08;
			vrm.update(delta);
		}
		renderer.render(scene, camera);
	};
	resize();
	animate();

	return {
		async load(url) {
			const loader = new GLTFLoader();
			loader.register((parser) => new VRMLoaderPlugin(parser));
			const gltf = await loader.loadAsync(url);
			const loaded = gltf.userData.vrm as VRM | undefined;
			if (!loaded) throw new Error("Arquivo não é um VRM");
			if (vrm) {
				scene.remove(vrm.scene);
				VRMUtils.deepDispose(vrm.scene);
			}
			VRMUtils.removeUnnecessaryVertices(gltf.scene);
			VRMUtils.rotateVRM0(loaded);
			relaxArms(loaded);
			scene.add(loaded.scene);
			vrm = loaded;
		},
		setSpeaking: (value) => {
			speaking = value;
		},
		setMood: (value) => {
			mood = value;
		},
		dispose() {
			cancelAnimationFrame(frame);
			observer.disconnect();
			if (vrm) VRMUtils.deepDispose(vrm.scene);
			renderer.dispose();
		},
	};
}

import {
	Activity,
	Award,
	BookOpen,
	Brain,
	Briefcase,
	CalendarCheck,
	CalendarRange,
	CircleHelp,
	Clock,
	Coins,
	Cpu,
	Crown,
	Drama,
	Feather,
	Flame,
	Footprints,
	Gamepad2,
	Gem,
	GitBranch,
	Globe,
	GraduationCap,
	Handshake,
	Heart,
	type LucideIcon,
	MessageCircle,
	Mic,
	Mic2,
	Plane,
	Repeat,
	Rocket,
	ShieldCheck,
	ShoppingBag,
	Smartphone,
	Sparkles,
	Zap,
} from "lucide-react";

/**
 * Icon names that curriculum modules and achievements store as strings.
 * Static imports keep lucide tree-shakeable; iconMap.test.ts fails when
 * data uses a name missing here.
 */
const ICONS = {
	Activity,
	Award,
	BookOpen,
	Brain,
	Briefcase,
	CalendarCheck,
	CalendarRange,
	Clock,
	Coins,
	Cpu,
	Crown,
	Feather,
	Flame,
	Footprints,
	Gamepad2,
	Gem,
	GitBranch,
	Globe,
	GraduationCap,
	Handshake,
	Heart,
	MessageCircle,
	Mic,
	Mic2,
	Plane,
	Repeat,
	Rocket,
	ShieldCheck,
	ShoppingBag,
	Smartphone,
	Sparkles,
	Zap,
	// Lucide has no "Mask"; the curriculum data uses it for the humor module.
	Mask: Drama,
} satisfies Record<string, LucideIcon>;

export function hasIcon(name: string): boolean {
	return Object.hasOwn(ICONS, name);
}

/** Resolves a stored icon name; unknown names get `fallback` (never throws). */
export function getIcon(
	name: string,
	fallback: LucideIcon = CircleHelp,
): LucideIcon {
	return hasIcon(name) ? ICONS[name as keyof typeof ICONS] : fallback;
}

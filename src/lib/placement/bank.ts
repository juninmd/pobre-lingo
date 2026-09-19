import { placementA1 } from "./bank-a1";
import { placementA2 } from "./bank-a2";
import { placementB1 } from "./bank-b1";
import { placementB2 } from "./bank-b2";
import { placementC1 } from "./bank-c1";
import { placementC2 } from "./bank-c2";
import type { PlacementItem } from "./types";

export const placementBank: PlacementItem[] = [
	...placementA1,
	...placementA2,
	...placementB1,
	...placementB2,
	...placementC1,
	...placementC2,
];

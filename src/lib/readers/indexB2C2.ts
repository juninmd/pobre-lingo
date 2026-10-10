import type { GradedReader } from "../gradedReadersTypes";
import { readersB2_01 } from "./b2-01";
import { readersB2_02 } from "./b2-02";
import { readersB2_03 } from "./b2-03";
import { readersB2_04 } from "./b2-04";
import { readersB2_05 } from "./b2-05";
import { readersB2_06 } from "./b2-06";
import { readersC1_01 } from "./c1-01";
import { readersC1_02 } from "./c1-02";
import { readersC1_03 } from "./c1-03";
import { readersC1_04 } from "./c1-04";
import { readersC1_05 } from "./c1-05";
import { readersC1_06 } from "./c1-06";
import { readersC2_01 } from "./c2-01";
import { readersC2_02 } from "./c2-02";
import { readersC2_03 } from "./c2-03";
import { readersC2_04 } from "./c2-04";
import { readersC2_05 } from "./c2-05";

export const readersB2C2: GradedReader[] = [
	...readersB2_01,
	...readersB2_02,
	...readersB2_03,
	...readersB2_04,
	...readersB2_05,
	...readersB2_06,
	...readersC1_01,
	...readersC1_02,
	...readersC1_03,
	...readersC1_04,
	...readersC1_05,
	...readersC1_06,
	...readersC2_01,
	...readersC2_02,
	...readersC2_03,
	...readersC2_04,
	...readersC2_05,
];

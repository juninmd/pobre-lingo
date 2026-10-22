import type { GradedReader } from "../gradedReadersTypes";
import { readersA1_01 } from "./a1-01";
import { readersA1_02 } from "./a1-02";
import { readersA1_03 } from "./a1-03";
import { readersA1_04 } from "./a1-04";
import { readersA1_05 } from "./a1-05";
import { readersA2_01 } from "./a2-01";
import { readersA2_02 } from "./a2-02";
import { readersA2_03 } from "./a2-03";
import { readersA2_04 } from "./a2-04";
import { readersA2_05 } from "./a2-05";
import { readersA2_06 } from "./a2-06";
import { readersB1_01 } from "./b1-01";
import { readersB1_02 } from "./b1-02";
import { readersB1_03 } from "./b1-03";
import { readersB1_04 } from "./b1-04";
import { readersB1_05 } from "./b1-05";
import { readersB1_06 } from "./b1-06";

export const readersA1B1: GradedReader[] = [
	...readersA1_01,
	...readersA1_02,
	...readersA1_03,
	...readersA1_04,
	...readersA1_05,
	...readersA2_01,
	...readersA2_02,
	...readersA2_03,
	...readersA2_04,
	...readersA2_05,
	...readersA2_06,
	...readersB1_01,
	...readersB1_02,
	...readersB1_03,
	...readersB1_04,
	...readersB1_05,
	...readersB1_06,
];

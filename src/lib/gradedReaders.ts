import { readersA1B1 } from "./gradedReadersA1B1";
import { readersB2C1 } from "./gradedReadersB2C1";
import type { GradedReader } from "./gradedReadersTypes";
import { readersA1B1 as extendedA1B1 } from "./readers/indexA1B1";
import { readersB2C2 } from "./readers/indexB2C2";

export type { GradedReader, ReaderLine } from "./gradedReadersTypes";

export const gradedReaders: GradedReader[] = [
	...readersA1B1,
	...extendedA1B1,
	...readersB2C1,
	...readersB2C2,
];

export function getReaderById(id: string): GradedReader | undefined {
	return gradedReaders.find((reader) => reader.id === id);
}

export function getWordCount(reader: GradedReader): number {
	return reader.lines.reduce(
		(total, line) => total + line.en.trim().split(/\s+/).length,
		0,
	);
}

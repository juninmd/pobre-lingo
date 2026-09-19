import { readersA1B1 } from "./gradedReadersA1B1";
import { readersB2C1 } from "./gradedReadersB2C1";
import type { GradedReader } from "./gradedReadersTypes";

export type { GradedReader, ReaderLine } from "./gradedReadersTypes";

export const gradedReaders: GradedReader[] = [...readersA1B1, ...readersB2C1];

export function getReaderById(id: string): GradedReader | undefined {
	return gradedReaders.find((reader) => reader.id === id);
}

export function getWordCount(reader: GradedReader): number {
	return reader.lines.reduce(
		(total, line) => total + line.en.trim().split(/\s+/).length,
		0,
	);
}

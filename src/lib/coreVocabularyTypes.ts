export type WordDifficulty = 1 | 2 | 3 | 4 | 5;
export interface CoreWord {
    id: string;
    word: string;
    translation: string;
    partOfSpeech: string;
    difficulty: WordDifficulty;
    example: string;
    exampleTranslation: string;
    tags?: string[];
}

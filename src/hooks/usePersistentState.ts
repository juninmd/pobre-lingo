import { useState } from 'react';
export function usePersistentState<T>(key: string, initial: T) { return useState<T>(initial); }

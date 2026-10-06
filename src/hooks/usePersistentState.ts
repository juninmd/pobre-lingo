import { useState } from 'react';
export function usePersistentState<T>(key: string, initialValue: T): [T, (val: T) => void] { return [initialValue, () => {}]; }

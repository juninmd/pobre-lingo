"use client";

import { useState, useCallback, useMemo } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/localStorage';
import { GrammarRule, getRuleById } from '@/lib/grammarRules'; // Assuming getRuleById can fetch rule details

const BOOKMARKED_RULES_KEY = 'pobrelingo_bookmarked_rules';

export function useBookmarkedRules() {
  const [bookmarkedRuleIds, setBookmarkedRuleIds] = useState<string[]>(() => {
    return getLocalStorageItem<string[]>(BOOKMARKED_RULES_KEY, []);
  });

  const bookmarkedRules = useMemo(() => {
    return bookmarkedRuleIds
      .map(id => getRuleById(id))
      .filter((rule): rule is GrammarRule => rule !== undefined);
  }, [bookmarkedRuleIds]);

  const addBookmark = useCallback((ruleId: string) => {
    setBookmarkedRuleIds(prevIds => {
      if (prevIds.includes(ruleId)) {
        return prevIds;
      }
      const newIds = [...prevIds, ruleId];
      setLocalStorageItem(BOOKMARKED_RULES_KEY, newIds);
      return newIds;
    });
  }, []);

  const removeBookmark = useCallback((ruleId: string) => {
    setBookmarkedRuleIds(prevIds => {
      const newIds = prevIds.filter(id => id !== ruleId);
      setLocalStorageItem(BOOKMARKED_RULES_KEY, newIds);
      return newIds;
    });
  }, []);

  const bookmarkedRuleIdsSet = useMemo(() => new Set(bookmarkedRuleIds), [bookmarkedRuleIds]);

  const isBookmarked = useCallback((ruleId: string) => {
    return bookmarkedRuleIdsSet.has(ruleId);
  }, [bookmarkedRuleIdsSet]);

  const toggleBookmark = useCallback((ruleId: string) => {
    if (isBookmarked(ruleId)) {
      removeBookmark(ruleId);
    } else {
      addBookmark(ruleId);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  return { bookmarkedRules, bookmarkedRuleIds, toggleBookmark, isBookmarked, addBookmark, removeBookmark };
}

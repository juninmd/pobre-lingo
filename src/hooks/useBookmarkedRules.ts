"use client";

import { useState, useEffect, useCallback } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/localStorage';
import { GrammarRule, getRuleById } from '@/lib/grammarRules'; // Assuming getRuleById can fetch rule details

const BOOKMARKED_RULES_KEY = 'pobrelingo_bookmarked_rules';

export function useBookmarkedRules() {
  const [bookmarkedRuleIds, setBookmarkedRuleIds] = useState<string[]>([]);
  const [bookmarkedRules, setBookmarkedRules] = useState<GrammarRule[]>([]);

  useEffect(() => {
    // Load bookmarked IDs from localStorage on mount
    const storedIds = getLocalStorageItem<string[]>(BOOKMARKED_RULES_KEY, []);
    setBookmarkedRuleIds(storedIds);
  }, []);

  useEffect(() => {
    // Fetch rule details when bookmarkedRuleIds change
    const rules = bookmarkedRuleIds
      .map(id => getRuleById(id))
      .filter((rule): rule is GrammarRule => rule !== undefined);
    setBookmarkedRules(rules);
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

  const isBookmarked = useCallback((ruleId: string) => {
    return bookmarkedRuleIds.includes(ruleId);
  }, [bookmarkedRuleIds]);

  const toggleBookmark = useCallback((ruleId: string) => {
    if (isBookmarked(ruleId)) {
      removeBookmark(ruleId);
    } else {
      addBookmark(ruleId);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  return { bookmarkedRules, bookmarkedRuleIds, toggleBookmark, isBookmarked, addBookmark, removeBookmark };
}

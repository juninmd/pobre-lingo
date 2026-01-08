"use client";

import { useState, useEffect, useCallback } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/localStorage';

const STUDIED_RULES_KEY = 'pobrelingo_studied_rules';

export function useStudiedRules() {
  const [studiedRuleIds, setStudiedRuleIds] = useState<string[]>([]);

  useEffect(() => {
    // Load studied IDs from localStorage on mount
    const storedIds = getLocalStorageItem<string[]>(STUDIED_RULES_KEY, []);
    setStudiedRuleIds(storedIds);
  }, []);

  const markAsStudied = useCallback((ruleId: string) => {
    setStudiedRuleIds(prevIds => {
      if (prevIds.includes(ruleId)) {
        return prevIds;
      }
      const newIds = [...prevIds, ruleId];
      setLocalStorageItem(STUDIED_RULES_KEY, newIds);
      return newIds;
    });
  }, []);

  const unmarkAsStudied = useCallback((ruleId: string) => {
    setStudiedRuleIds(prevIds => {
      const newIds = prevIds.filter(id => id !== ruleId);
      setLocalStorageItem(STUDIED_RULES_KEY, newIds);
      return newIds;
    });
  }, []);

  const isStudied = useCallback((ruleId: string) => {
    return studiedRuleIds.includes(ruleId);
  }, [studiedRuleIds]);

  const toggleStudied = useCallback((ruleId: string) => {
    if (studiedRuleIds.includes(ruleId)) {
      unmarkAsStudied(ruleId);
    } else {
      markAsStudied(ruleId);
    }
  }, [studiedRuleIds, markAsStudied, unmarkAsStudied]);

  const getStudiedCount = useCallback(() => {
    return studiedRuleIds.length;
  }, [studiedRuleIds]);

  return {
    studiedRuleIds,
    markAsStudied,
    unmarkAsStudied,
    isStudied,
    toggleStudied,
    getStudiedCount,
  };
}

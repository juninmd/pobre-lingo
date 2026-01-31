import { renderHook, act } from '@testing-library/react';
import { useCurriculumProgress } from './useCurriculumProgress';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useCurriculumProgress', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCurriculumProgress());

    expect(result.current.completedLessons).toEqual([]);
    expect(result.current.totalXP).toBe(0);
    expect(result.current.userLevel).toBe(1);
    expect(result.current.streak).toBe(0);
  });

  it('should complete a lesson and update progress', () => {
    const { result } = renderHook(() => useCurriculumProgress());

    const moduleId = 'foundations';
    const lessonId = 'alphabet-pronunciation';
    const xpReward = 50;

    act(() => {
      result.current.completeLesson(moduleId, lessonId, xpReward);
    });

    expect(result.current.isLessonCompleted(moduleId, lessonId)).toBe(true);
    expect(result.current.totalXP).toBe(50);
    expect(result.current.userLevel).toBe(1); // 50 < 100
  });

  it('should correctly calculate module progress', () => {
    const { result } = renderHook(() => useCurriculumProgress());
    const moduleId = 'foundations';
    const lessonId = 'alphabet-pronunciation';

    // Get initial progress
    const initialProgress = result.current.getModuleProgress(moduleId);
    expect(initialProgress.lessonsCompleted).toBe(0);
    expect(initialProgress.completionPercentage).toBe(0);

    // Complete one lesson
    act(() => {
      result.current.completeLesson(moduleId, lessonId, 50);
    });

    const updatedProgress = result.current.getModuleProgress(moduleId);
    expect(updatedProgress.lessonsCompleted).toBe(1);
    expect(updatedProgress.completionPercentage).toBeGreaterThan(0);
  });

  it('should not double count completing the same lesson', () => {
    const { result } = renderHook(() => useCurriculumProgress());
    const moduleId = 'foundations';
    const lessonId = 'alphabet-pronunciation';
    const xpReward = 50;

    act(() => {
      result.current.completeLesson(moduleId, lessonId, xpReward);
    });

    act(() => {
      result.current.completeLesson(moduleId, lessonId, xpReward);
    });

    expect(result.current.completedLessons.length).toBe(1);
    expect(result.current.totalXP).toBe(50);
  });
});

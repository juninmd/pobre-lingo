import { useState, useEffect, useCallback } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/localStorage';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface UsePWAInstallReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  promptInstall: () => Promise<void>;
  dismissPrompt: () => void;
  wasPromptDismissed: boolean;
}

const STORAGE_KEY = 'pobrelingo_pwa_prompt_dismissed';
const DISMISS_DURATION_DAYS = 7;

export function usePWAInstall(): UsePWAInstallReturn {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [wasPromptDismissed, setWasPromptDismissed] = useState(() => {
    const dismissedAt = getLocalStorageItem<number>(STORAGE_KEY, 0);
    if (dismissedAt) {
      const daysSinceDismiss = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      return daysSinceDismiss < DISMISS_DURATION_DAYS;
    }
    return false;
  });

  // Check if running on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = (navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsInstalled(isStandalone || isInWebAppiOS);
    };

    checkInstalled();

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    setInstallPrompt(null);
  }, [installPrompt]);

  const dismissPrompt = useCallback(() => {
    setWasPromptDismissed(true);
    setLocalStorageItem(STORAGE_KEY, Date.now());
  }, []);

  return {
    isInstallable: !!installPrompt && !isInstalled && !wasPromptDismissed,
    isInstalled,
    isIOS,
    promptInstall,
    dismissPrompt,
    wasPromptDismissed,
  };
}

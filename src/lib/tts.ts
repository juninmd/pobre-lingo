// Text-to-Speech Utility
// Handles voice selection to prioritize high-quality voices (Edge/Google)
// and ensures voices are loaded before speaking.

let voicesLoaded = false;
let voices: SpeechSynthesisVoice[] = [];

// Initialize voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesLoaded = true;
    }
  };

  loadVoices();

  // Chrome/Edge load voices asynchronously
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

/**
 * Selects the best available voice for the given language.
 * Priorities:
 * 1. Microsoft (Edge)
 * 2. Google
 * 3. Apple (Samantha/Daniel)
 * 4. Generic "English"
 */
function getBestVoice(lang: string): SpeechSynthesisVoice | null {
  if (!voicesLoaded) {
    voices = window.speechSynthesis.getVoices();
  }

  // Filter for the requested language
  // Try exact match first, then prefix match
  let langVoices = voices.filter(v => v.lang === lang);
  if (langVoices.length === 0) {
    langVoices = voices.filter(v => v.lang.startsWith(lang.split('-')[0]));
  }

  if (langVoices.length === 0) return null;

  // Priority keywords for "Better" voices
  const priorities = [
    'Natural',      // Edge Neural
    'Microsoft',    // Edge/Windows
    'Google',       // Chrome
    'Daniel',       // Apple (UK)
    'Samantha',     // Apple (US)
    'Online',       // Android Online
    'Enhanced'      // Android/iOS Enhanced
  ];

  for (const keyword of priorities) {
    const found = langVoices.find(v => v.name.includes(keyword));
    if (found) return found;
  }

  // Fallback to the first available voice
  return langVoices[0];
}

export const tts = {
  /**
   * Speaks the given text using the best available voice.
   * @param text The text to speak
   * @param lang The BCP 47 language tag (default: 'en-US')
   * @param rate Speed (0.1 to 10, default 1)
   * @param pitch Pitch (0 to 2, default 1)
   */
  speak: (text: string, lang: string = 'en-US', rate: number = 1, pitch: number = 1) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech not supported');
      return;
    }

    // Cancel previous speech to avoid queue buildup
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voice = getBestVoice(lang);
    if (voice) {
      utterance.voice = voice;
      // console.log(`Using voice: ${voice.name}`);
    }

    window.speechSynthesis.speak(utterance);
  },

  /**
   * Stops any currently playing speech.
   */
  cancel: () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};

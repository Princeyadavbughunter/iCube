'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { COPY, LANGS, LANG_SHORT, type Copy, type Lang } from '@/config/i18n';

interface LanguageValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  /** This language's copy tree — see `src/config/i18n.ts`. */
  t: Copy;
}

const LanguageContext = createContext<LanguageValue | null>(null);

const STORAGE_KEY = 'icube-lang';

function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'pa';
}

/**
 * Which language the page is rendered in.
 *
 * The choice is a client-side toggle rather than a route, so the clinic's
 * existing URLs are untouched. That has one consequence worth stating plainly:
 * the server always renders English, and Punjabi is applied on the client
 * after hydration. Search engines therefore index the English page — which is
 * the page that already ranks — and a Punjabi reader gets their language on
 * arrival only from the second visit onwards.
 *
 * Starting from English rather than reading localStorage during render is
 * deliberate: reading it in `useState`'s initialiser makes the first client
 * render disagree with the server's, which React reports as a hydration
 * mismatch. The stored choice is applied in an effect instead, one frame later.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) setLangState(stored);
    } catch {
      // Private mode, or site data blocked. English is a fine place to land.
    }
  }, []);

  // Assistive tech picks pronunciation from this, so it has to track the toggle.
  useEffect(() => {
    document.documentElement.lang = lang === 'pa' ? 'pa' : 'en';
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not being able to remember the choice is not a reason to refuse it.
    }
  }, []);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: COPY[lang] }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/**
 * The current language and its copy.
 *
 * Falls back to English outside a provider rather than throwing: several of
 * these components also render on the branch-chooser and legacy pages, which
 * are not wrapped, and an English heading there is better than a blank screen.
 */
export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  return ctx ?? { lang: 'en', setLang: () => {}, t: COPY.en };
}

/**
 * The header's language switch.
 *
 * Two buttons rather than a dropdown: with only two languages a select costs a
 * tap and hides the alternative. Each label is written in its own language, so
 * a Punjabi reader can find it without reading English first.
 */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gray-200 bg-white/70 p-0.5 ${className}`}
      role="group"
      aria-label={t.header.languageLabel}
    >
      {LANGS.map((option) => {
        const isActive = option === lang;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={isActive}
            lang={option}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors md:text-[11px] ${
              isActive
                ? 'bg-[var(--brand-teal)] text-white'
                : 'text-gray-500 hover:text-[var(--brand-teal)]'
            }`}
          >
            {LANG_SHORT[option]}
          </button>
        );
      })}
    </div>
  );
}

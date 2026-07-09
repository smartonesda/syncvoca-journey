import { useState } from 'react';
import { Accessibility, Check, Eye, EyeOff, Sparkles, Volume2 } from 'lucide-react';
import { AccessibilityPreferences } from '../types';

interface AccessibilityPanelProps {
  preferences: AccessibilityPreferences;
  onPreferencesChange: (prefs: AccessibilityPreferences) => void;
}

export default function AccessibilityPanel({ preferences, onPreferencesChange }: AccessibilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePreference = (key: keyof AccessibilityPreferences) => {
    onPreferencesChange({
      ...preferences,
      [key]: !preferences[key]
    });
  };

  const setTextSize = (size: 'normal' | 'large' | 'xlarge') => {
    onPreferencesChange({
      ...preferences,
      textSize: size
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 p-2 text-sm font-semibold text-teal-800 shadow-sm transition hover:bg-teal-100 sm:px-3"
        aria-label="Pengaturan Aksesibilitas"
      >
        <Accessibility className="w-5 h-5 text-teal-600 animate-pulse" />
        <span className="hidden sm:inline">Mode Aksesibilitas</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-5 text-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h4 className="font-bold flex items-center gap-2 text-teal-800">
              <Accessibility className="w-5 h-5 text-teal-600" />
              Asisten Inklusi & Akses
            </h4>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700"
            >
              Tutup
            </button>
          </div>

          {/* Text Size */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 block">Ukuran Huruf (Font Size)</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                aria-pressed={preferences.textSize === 'normal'}
                onClick={() => setTextSize('normal')}
                className={`py-1.5 text-xs rounded border font-medium ${
                  preferences.textSize === 'normal'
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
              >
                Normal (14px)
              </button>
              <button
                type="button"
                aria-pressed={preferences.textSize === 'large'}
                onClick={() => setTextSize('large')}
                className={`py-1.5 text-xs rounded border font-bold ${
                  preferences.textSize === 'large'
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
              >
                Besar (18px)
              </button>
              <button
                type="button"
                aria-pressed={preferences.textSize === 'xlarge'}
                onClick={() => setTextSize('xlarge')}
                className={`py-1.5 text-xs rounded border font-black ${
                  preferences.textSize === 'xlarge'
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
              >
                Sangat Besar
              </button>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-slate-600 block">Kontras Tinggi (High Contrast)</span>
              <p className="text-[11px] text-slate-400">Tampilan hitam-putih kontras tinggi</p>
            </div>
            <button
              type="button"
              aria-pressed={preferences.highContrast}
              onClick={() => togglePreference('highContrast')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                preferences.highContrast ? 'bg-teal-600' : 'bg-slate-200'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform ${
                preferences.highContrast ? 'translate-x-5' : ''
              }`} />
            </button>
          </div>

          {/* Dyslexia Font */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-slate-600 block">Font Disleksia (Serif Helper)</span>
              <p className="text-[11px] text-slate-400">Gunakan font berkaki untuk kemudahan baca</p>
            </div>
            <button
              type="button"
              aria-pressed={preferences.dyslexiaFont}
              onClick={() => togglePreference('dyslexiaFont')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                preferences.dyslexiaFont ? 'bg-teal-600' : 'bg-slate-200'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform ${
                preferences.dyslexiaFont ? 'translate-x-5' : ''
              }`} />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-slate-600 block">Kurangi Gerakan (Reduced Motion)</span>
              <p className="text-[11px] text-slate-400">Nonaktifkan animasi/pergeseran dinamis</p>
            </div>
            <button
              type="button"
              aria-pressed={preferences.reducedMotion}
              onClick={() => togglePreference('reducedMotion')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                preferences.reducedMotion ? 'bg-teal-600' : 'bg-slate-200'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform ${
                preferences.reducedMotion ? 'translate-x-5' : ''
              }`} />
            </button>
          </div>

          {/* Text to Voice */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-slate-600 block">Text to Voice</span>
              <p className="text-[11px] text-slate-400">Bacakan teks halaman, tandai teks aktif, dan buka voice command</p>
            </div>
            <button
              type="button"
              aria-pressed={preferences.audioAssist}
              onClick={() => togglePreference('audioAssist')}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                preferences.audioAssist ? 'bg-teal-600' : 'bg-slate-200'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform ${
                preferences.audioAssist ? 'translate-x-5' : ''
              }`} />
            </button>
          </div>

          <div className="bg-teal-50 border border-teal-100 p-2.5 rounded text-[11px] text-teal-800 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Asisten ini merujuk pada standar inklusif aksesibilitas WCAG 2.1 AA.</span>
          </div>
        </div>
      )}
    </div>
  );
}

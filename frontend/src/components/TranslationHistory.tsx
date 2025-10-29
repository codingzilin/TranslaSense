"use client";

import { motion } from "motion/react";
import { Clock, Trash2, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Translation {
  id: string;
  from: string;
  to: string;
  sourceLang: string;
  targetLang: string;
  timestamp: Date;
}

interface TranslationHistoryProps {
  history: Translation[];
  onSelect: (translation: Translation) => void;
  onClear: () => void;
}

const languages = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "ru", name: "Русский" },
  { code: "ar", name: "العربية" },
  { code: "pt", name: "Português" },
  { code: "it", name: "Italiano" },
  { code: "nl", name: "Nederlands" },
  { code: "sv", name: "Svenska" },
  { code: "da", name: "Dansk" },
  { code: "no", name: "Norsk" },
  { code: "fi", name: "Suomi" },
  { code: "pl", name: "Polski" },
  { code: "cs", name: "Čeština" },
  { code: "hu", name: "Magyar" },
  { code: "ro", name: "Română" },
  { code: "bg", name: "Български" },
  { code: "hr", name: "Hrvatski" },
  { code: "sk", name: "Slovenčina" },
  { code: "sl", name: "Slovenščina" },
  { code: "et", name: "Eesti" },
  { code: "lv", name: "Latviešu" },
  { code: "lt", name: "Lietuvių" },
  { code: "el", name: "Ελληνικά" },
  { code: "tr", name: "Türkçe" },
  { code: "he", name: "עברית" },
  { code: "th", name: "ไทย" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "ms", name: "Bahasa Melayu" },
  { code: "tl", name: "Filipino" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "ml", name: "മലയാളം" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "or", name: "ଓଡ଼ିଆ" },
  { code: "as", name: "অসমীয়া" },
  { code: "ne", name: "नेपाली" },
  { code: "si", name: "සිංහල" },
  { code: "my", name: "မြန်မာ" },
  { code: "km", name: "ខ្មែរ" },
  { code: "lo", name: "ລາວ" },
  { code: "ka", name: "ქართული" },
  { code: "am", name: "አማርኛ" },
  { code: "sw", name: "Kiswahili" },
  { code: "zu", name: "IsiZulu" },
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Shqip" },
  { code: "mk", name: "Македонски" },
  { code: "sr", name: "Српски" },
  { code: "bs", name: "Bosanski" },
  { code: "me", name: "Crnogorski" },
  { code: "is", name: "Íslenska" },
  { code: "ga", name: "Gaeilge" },
  { code: "cy", name: "Cymraeg" },
  { code: "mt", name: "Malti" },
  { code: "eu", name: "Euskera" },
  { code: "ca", name: "Català" },
  { code: "gl", name: "Galego" },
];

function getLanguageName(code: string): string {
  const lang = languages.find(l => l.code === code);
  return lang ? lang.name : code.toUpperCase();
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
}

export function TranslationHistory({ history, onSelect, onClear }: TranslationHistoryProps) {
  if (history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/30 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-800">Recent Translations</h3>
          </div>
          <Button
            onClick={onClear}
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-slate-800 hover:bg-white/50"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>

        <div className="space-y-3">
          {history.map((translation, index) => (
            <motion.div
              key={translation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/40 backdrop-blur-xl rounded-xl p-4 border border-white/30 hover:bg-white/60 transition-all cursor-pointer group"
              onClick={() => onSelect(translation)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      {getLanguageName(translation.sourceLang)}
                    </span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      {getLanguageName(translation.targetLang)}
                    </span>
                    <span className="text-xs text-slate-400 ml-auto">
                      {formatTimeAgo(translation.timestamp)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-slate-700 line-clamp-2 group-hover:text-slate-900">
                      {translation.from}
                    </p>
                    <p className="text-sm text-slate-600 line-clamp-2 group-hover:text-slate-800">
                      {translation.to}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

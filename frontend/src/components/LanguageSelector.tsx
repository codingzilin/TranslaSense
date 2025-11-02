"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  { code: "pt-BR", name: "Português (Brasil)" },
  { code: "es-AR", name: "Español (Argentina)" },
  { code: "es-MX", name: "Español (México)" },
  { code: "es-CO", name: "Español (Colombia)" },
  { code: "es-PE", name: "Español (Perú)" },
  { code: "es-VE", name: "Español (Venezuela)" },
  { code: "es-CL", name: "Español (Chile)" },
  { code: "es-UY", name: "Español (Uruguay)" },
  { code: "es-PY", name: "Español (Paraguay)" },
  { code: "es-BO", name: "Español (Bolivia)" },
  { code: "es-EC", name: "Español (Ecuador)" },
  { code: "es-CR", name: "Español (Costa Rica)" },
  { code: "es-PA", name: "Español (Panamá)" },
  { code: "es-HN", name: "Español (Honduras)" },
  { code: "es-NI", name: "Español (Nicaragua)" },
  { code: "es-SV", name: "Español (El Salvador)" },
  { code: "es-GT", name: "Español (Guatemala)" },
  { code: "es-CU", name: "Español (Cuba)" },
  { code: "es-DO", name: "Español (República Dominicana)" },
  { code: "es-PR", name: "Español (Puerto Rico)" },
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "en-AU", name: "English (Australia)" },
  { code: "en-CA", name: "English (Canada)" },
  { code: "en-NZ", name: "English (New Zealand)" },
  { code: "en-IE", name: "English (Ireland)" },
  { code: "en-ZA", name: "English (South Africa)" },
  { code: "en-IN", name: "English (India)" },
  { code: "fr-FR", name: "Français (France)" },
  { code: "fr-CA", name: "Français (Canada)" },
  { code: "fr-BE", name: "Français (Belgique)" },
  { code: "fr-CH", name: "Français (Suisse)" },
  { code: "de-DE", name: "Deutsch (Deutschland)" },
  { code: "de-AT", name: "Deutsch (Österreich)" },
  { code: "de-CH", name: "Deutsch (Schweiz)" },
  { code: "it-IT", name: "Italiano (Italia)" },
  { code: "it-CH", name: "Italiano (Svizzera)" },
  { code: "pt-PT", name: "Português (Portugal)" },
  { code: "nl-NL", name: "Nederlands (Nederland)" },
  { code: "nl-BE", name: "Nederlands (België)" },
  { code: "sv-SE", name: "Svenska (Sverige)" },
  { code: "da-DK", name: "Dansk (Danmark)" },
  { code: "no-NO", name: "Norsk (Norge)" },
  { code: "fi-FI", name: "Suomi (Suomi)" },
  { code: "pl-PL", name: "Polski (Polska)" },
  { code: "cs-CZ", name: "Čeština (Česká republika)" },
  { code: "hu-HU", name: "Magyar (Magyarország)" },
  { code: "ro-RO", name: "Română (România)" },
  { code: "bg-BG", name: "Български (България)" },
  { code: "hr-HR", name: "Hrvatski (Hrvatska)" },
  { code: "sk-SK", name: "Slovenčina (Slovensko)" },
  { code: "sl-SI", name: "Slovenščina (Slovenija)" },
  { code: "et-EE", name: "Eesti (Eesti)" },
  { code: "lv-LV", name: "Latviešu (Latvija)" },
  { code: "lt-LT", name: "Lietuvių (Lietuva)" },
  { code: "el-GR", name: "Ελληνικά (Ελλάδα)" },
  { code: "tr-TR", name: "Türkçe (Türkiye)" },
  { code: "he-IL", name: "עברית (ישראל)" },
  { code: "th-TH", name: "ไทย (ประเทศไทย)" },
  { code: "vi-VN", name: "Tiếng Việt (Việt Nam)" },
  { code: "id-ID", name: "Bahasa Indonesia (Indonesia)" },
  { code: "ms-MY", name: "Bahasa Melayu (Malaysia)" },
  { code: "tl-PH", name: "Filipino (Pilipinas)" },
  { code: "hi-IN", name: "हिन्दी (भारत)" },
  { code: "bn-BD", name: "বাংলা (বাংলাদেশ)" },
  { code: "bn-IN", name: "বাংলা (ভারত)" },
  { code: "ta-IN", name: "தமிழ் (இந்தியா)" },
  { code: "ta-LK", name: "தமிழ் (இலங்கை)" },
  { code: "te-IN", name: "తెలుగు (భారతదేశం)" },
  { code: "ml-IN", name: "മലയാളം (ഇന്ത്യ)" },
  { code: "kn-IN", name: "ಕನ್ನಡ (ಭಾರತ)" },
  { code: "gu-IN", name: "ગુજરાતી (ભારત)" },
  { code: "pa-IN", name: "ਪੰਜਾਬੀ (ਭਾਰਤ)" },
  { code: "or-IN", name: "ଓଡ଼ିଆ (ଭାରତ)" },
  { code: "as-IN", name: "অসমীয়া (ভাৰত)" },
  { code: "ne-NP", name: "नेपाली (नेपाल)" },
  { code: "si-LK", name: "සිංහල (ශ්‍රී ලංකාව)" },
  { code: "my-MM", name: "မြန်မာ (မြန်မာ)" },
  { code: "km-KH", name: "ខ្មែរ (កម្ពុជា)" },
  { code: "lo-LA", name: "ລາວ (ລາວ)" },
  { code: "ka-GE", name: "ქართული (საქართველო)" },
  { code: "am-ET", name: "አማርኛ (ኢትዮጵያ)" },
  { code: "sw-KE", name: "Kiswahili (Kenya)" },
  { code: "sw-TZ", name: "Kiswahili (Tanzania)" },
  { code: "zu-ZA", name: "IsiZulu (South Africa)" },
  { code: "af-ZA", name: "Afrikaans (South Africa)" },
  { code: "sq-AL", name: "Shqip (Shqipëria)" },
  { code: "mk-MK", name: "Македонски (Македонија)" },
  { code: "sr-RS", name: "Српски (Србија)" },
  { code: "sr-BA", name: "Српски (Босна и Херцеговина)" },
  { code: "bs-BA", name: "Bosanski (Bosna i Hercegovina)" },
  { code: "me-ME", name: "Crnogorski (Crna Gora)" },
  { code: "is-IS", name: "Íslenska (Ísland)" },
  { code: "ga-IE", name: "Gaeilge (Éire)" },
  { code: "cy-GB", name: "Cymraeg (Cymru)" },
  { code: "mt-MT", name: "Malti (Malta)" },
  { code: "eu-ES", name: "Euskera (Espainia)" },
  { code: "ca-ES", name: "Català (Espanya)" },
  { code: "gl-ES", name: "Galego (España)" },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function LanguageSelector({
  value,
  onChange,
  label,
}: LanguageSelectorProps) {
  return (
    <div className='flex-1'>
      <label className='block text-sm font-medium text-slate-700 mb-2'>
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className='w-full bg-white/50 backdrop-blur-xl border-white/30 rounded-xl text-slate-900'>
          <SelectValue
            placeholder={`Select ${label.toLowerCase()} language`}
            className='text-slate-900'
          />
        </SelectTrigger>
        <SelectContent className='bg-white/90 backdrop-blur-xl border-white/30 text-slate-900'>
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className='text-slate-900 focus:text-slate-900 focus:bg-slate-100'
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

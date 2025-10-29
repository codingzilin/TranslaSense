"use client";

import { useState } from "react";
import { ArrowLeftRight, Copy, Volume2, Sparkles, Check } from "lucide-react";
import { motion } from "motion/react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { TranslationHistory } from "@/components/TranslationHistory";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { translateText } from "@/lib/translation";
import { getToneDescription } from "@/lib/prompts";

interface Translation {
  id: string;
  from: string;
  to: string;
  sourceLang: string;
  targetLang: string;
  timestamp: Date;
}

export default function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [selectedTone, setSelectedTone] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [history, setHistory] = useState<Translation[]>([]);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    if (sourceLang === targetLang) {
      toast.error("Source and target languages cannot be the same");
      return;
    }

    setIsTranslating(true);

    try {
      const result = await translateText({
        text: sourceText,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        tone: selectedTone,
      });

      if (result.success) {
        setTranslatedText(result.translatedText);

        // Add to history
        const newTranslation: Translation = {
          id: Date.now().toString(),
          from: sourceText,
          to: result.translatedText,
          sourceLang,
          targetLang,
          timestamp: new Date(),
        };
        setHistory((prev) => [newTranslation, ...prev].slice(0, 5));

        toast.success("Translation complete!");
      } else {
        toast.error(result.error || "Translation failed");
      }
    } catch (err) {
      toast.error("An error occurred during translation");
      console.error("Translation error:", err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopyToClipboard = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSelectHistory = (translation: Translation) => {
    setSourceText(translation.from);
    setTranslatedText(translation.to);
    setSourceLang(translation.sourceLang);
    setTargetLang(translation.targetLang);
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast.success("History cleared");
  };

  const handleSpeak = (text: string, lang: string) => {
    if ("speechSynthesis" in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Text-to-speech not supported");
    }
  };

  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* Background gradient */}
      <div className='fixed inset-0 -z-10'>
        <div className='absolute inset-0 bg-linear-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80' />
      </div>

      <div className='relative z-10 container mx-auto px-4 py-12'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='p-3 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg'>
              <Sparkles className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-slate-800'>TranslaSense</h1>
          </div>
          <p className='text-slate-600'>
            Smart translation tool that breaks down language barriers
          </p>
        </motion.div>

        {/* Main translator card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className='w-full max-w-4xl mx-auto'
        >
          <div className='bg-white/30 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]'>
            {/* Language selectors */}
            <div className='flex items-center justify-between mb-6 gap-4'>
              <LanguageSelector
                value={sourceLang}
                onChange={setSourceLang}
                label='From'
              />

              <button
                onClick={handleSwapLanguages}
                className='p-3 bg-white/50 backdrop-blur-xl rounded-xl border border-white/30 hover:bg-white/70 hover:scale-105 transition-all shadow-sm'
                aria-label='Swap languages'
              >
                <ArrowLeftRight className='w-5 h-5 text-slate-600' />
              </button>

              <LanguageSelector
                value={targetLang}
                onChange={setTargetLang}
                label='To'
              />
            </div>

            {/* Tone Selection */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-slate-700 mb-3'>
                Translation Tone
              </label>
              <div className='flex flex-wrap gap-3'>
                {[
                  { id: "cute", label: "Cute", emoji: "😊" },
                  { id: "formal", label: "Formal", emoji: "👔" },
                  { id: "angry", label: "Angry", emoji: "😠" },
                  { id: "casual", label: "Casual", emoji: "😎" },
                ].map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() =>
                      setSelectedTone(selectedTone === tone.id ? "" : tone.id)
                    }
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                      selectedTone === tone.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-white/30 bg-white/40 text-slate-700 hover:border-white/50"
                    }`}
                  >
                    <span className='mr-2'>{tone.emoji}</span>
                    {tone.label}
                  </button>
                ))}
              </div>
              {selectedTone && (
                <div className='mt-2 p-3 bg-blue-50/50 backdrop-blur-xl rounded-lg border border-blue-200/50'>
                  <p className='text-sm text-blue-700'>
                    <span className='font-medium capitalize'>
                      {selectedTone}
                    </span>{" "}
                    tone selected
                  </p>
                  <p className='text-xs text-blue-600 mt-1'>
                    {getToneDescription(selectedTone)}
                  </p>
                </div>
              )}
            </div>

            {/* Translation areas */}
            <div className='grid md:grid-cols-2 gap-6 mb-6'>
              {/* Source text */}
              <div className='relative'>
                <div className='bg-white/40 backdrop-blur-xl rounded-2xl border border-white/30 p-4 shadow-sm'>
                  <Textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder='Enter text to translate...'
                    className='min-h-[200px] bg-transparent border-none focus:ring-0 resize-none p-0'
                  />
                  {sourceText && (
                    <button
                      onClick={() => handleSpeak(sourceText, sourceLang)}
                      className='absolute bottom-4 right-4 p-2 bg-white/60 backdrop-blur-xl rounded-lg hover:bg-white/80 transition-all'
                      aria-label='Speak source text'
                    >
                      <Volume2 className='w-4 h-4 text-slate-600' />
                    </button>
                  )}
                </div>
              </div>

              {/* Translated text */}
              <div className='relative'>
                <div className='bg-white/40 backdrop-blur-xl rounded-2xl border border-white/30 p-4 shadow-sm'>
                  <Textarea
                    value={translatedText}
                    readOnly
                    placeholder='Translation will appear here...'
                    className='min-h-[200px] bg-transparent border-none focus:ring-0 resize-none p-0 text-slate-700'
                  />
                  {translatedText && (
                    <div className='absolute bottom-4 right-4 flex gap-2'>
                      <button
                        onClick={() => handleSpeak(translatedText, targetLang)}
                        className='p-2 bg-white/60 backdrop-blur-xl rounded-lg hover:bg-white/80 transition-all'
                        aria-label='Speak translated text'
                      >
                        <Volume2 className='w-4 h-4 text-slate-600' />
                      </button>
                      <button
                        onClick={handleCopyToClipboard}
                        className='p-2 bg-white/60 backdrop-blur-xl rounded-lg hover:bg-white/80 transition-all'
                        aria-label='Copy translation'
                      >
                        {copied ? (
                          <Check className='w-4 h-4 text-green-600' />
                        ) : (
                          <Copy className='w-4 h-4 text-slate-600' />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Translate button */}
            <Button
              onClick={handleTranslate}
              disabled={isTranslating || !sourceText.trim()}
              className='w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isTranslating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className='w-5 h-5' />
                </motion.div>
              ) : (
                <>
                  <Sparkles className='w-5 h-5 mr-2' />
                  Translate
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Translation history */}
        {history.length > 0 && (
          <TranslationHistory
            history={history}
            onSelect={handleSelectHistory}
            onClear={handleClearHistory}
          />
        )}
      </div>
    </div>
  );
}

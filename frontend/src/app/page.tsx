"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translateText } from "@/lib/translation";

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
];

export default function Translator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Please enter text to translate");
      return;
    }

    if (!sourceLanguage || !targetLanguage) {
      setError("Please select both source and target languages");
      return;
    }

    if (sourceLanguage === targetLanguage) {
      setError("Source and target languages cannot be the same");
      return;
    }

    setIsTranslating(true);
    setError("");

    try {
      const result = await translateText({
        text: inputText,
        sourceLanguage,
        targetLanguage,
      });

      if (result.success) {
        setOutputText(result.translatedText);
      } else {
        setError(result.error || "Translation failed");
      }
    } catch (err) {
      setError("An error occurred during translation");
      console.error("Translation error:", err);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
              TranslaSense
            </h1>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              Smart translation tool that breaks down language barriers
            </p>
          </div>

          {/* Language Selectors */}
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Source Language
              </label>
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select source language' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className='flex items-center justify-center'>
              <button
                onClick={handleTranslate}
                disabled={isTranslating}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isTranslating ? "Translating..." : "Translate"}
              </button>
            </div>

            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Target Language
              </label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select target language' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
              {error}
            </div>
          )}

          {/* Translation Area */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Input Area */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Input Text
              </label>
              <Textarea
                placeholder='Enter text to translate...'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className='min-h-[200px] resize-none'
              />
            </div>

            {/* Output Area */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Translation Result
              </label>
              <Textarea
                placeholder='Translation will appear here...'
                value={outputText}
                readOnly
                className='min-h-[200px] resize-none bg-gray-50 dark:bg-gray-800'
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-center gap-4 mt-6'>
            <button
              onClick={() => {
                setInputText("");
                setOutputText("");
              }}
              className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
            >
              Clear
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(outputText);
              }}
              disabled={!outputText}
              className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Copy Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

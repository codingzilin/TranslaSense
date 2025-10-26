import { API_CONFIG, TRANSLATION_CONFIG } from "./config";

export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  tone?: string;
}

export interface TranslationResponse {
  translatedText: string;
  success: boolean;
  error?: string;
}

export async function translateText({
  text,
  sourceLanguage,
  targetLanguage,
  tone,
}: TranslationRequest): Promise<TranslationResponse> {
  try {
    if (!API_CONFIG.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    const languageNames = {
      en: "English",
      zh: "Chinese",
      es: "Spanish",
      fr: "French",
      de: "German",
      ja: "Japanese",
      ko: "Korean",
      ru: "Russian",
      ar: "Arabic",
      pt: "Portuguese",
    };

    const sourceLangName =
      languageNames[sourceLanguage as keyof typeof languageNames] ||
      sourceLanguage;
    const targetLangName =
      languageNames[targetLanguage as keyof typeof languageNames] ||
      targetLanguage;

    // Tone instructions
    const toneInstructions = {
      cute: "Use a cute, adorable, and sweet tone with gentle expressions.",
      formal:
        "Use a formal, professional, and respectful tone suitable for business or academic contexts.",
      angry:
        "Use an angry, frustrated, or aggressive tone that conveys strong negative emotions.",
      casual:
        "Use a casual, relaxed, and informal tone as if talking to a friend.",
    };

    const toneInstruction =
      tone && toneInstructions[tone as keyof typeof toneInstructions]
        ? `\n\nTone: ${toneInstructions[tone as keyof typeof toneInstructions]}`
        : "";

    const prompt = `Translate the following text from ${sourceLangName} to ${targetLangName}.${toneInstruction} Only return the translated text, nothing else:

"${text}"`;

    const response = await fetch(API_CONFIG.OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: TRANSLATION_CONFIG.MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: TRANSLATION_CONFIG.MAX_TOKENS,
        temperature: TRANSLATION_CONFIG.TEMPERATURE,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const translatedText = data.choices[0]?.message?.content?.trim();

    if (!translatedText) {
      throw new Error("No translation received from OpenAI");
    }

    return {
      translatedText,
      success: true,
    };
  } catch (error) {
    console.error("Translation error:", error);
    return {
      translatedText: "",
      success: false,
      error: error instanceof Error ? error.message : "Translation failed",
    };
  }
}

// API Configuration
export const API_CONFIG = {
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  OPENAI_API_URL: "https://api.openai.com/v1/chat/completions",
};

// Translation configuration
export const TRANSLATION_CONFIG = {
  MODEL: "gpt-3.5-turbo",
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.3,
};

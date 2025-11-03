# TranslaSense 🌐✨

A modern, AI-powered translation application that breaks down language barriers with intelligent tone-aware translations. Built with Next.js and powered by OpenAI's GPT models.

![TranslaSense](https://img.shields.io/badge/TranslaSense-v0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-green)

## ✨ Features

### 🎯 Core Features

- **AI-Powered Translation**: Leverages OpenAI GPT-3.5 Turbo for high-quality, context-aware translations
- **Tone Selection**: Choose from 4 distinct translation tones:
  - 😊 **Cute**: Sweet, enthusiastic, and endearing with playful language
  - 👔 **Formal**: Professional, precise, and polite for business/academic contexts
  - 😠 **Angry**: Strong, direct, and forceful with frustrated expressions
  - 😎 **Casual**: Friendly, conversational, and relaxed like talking to a friend
- **Multi-Language Support**: Translate between 100+ languages and regional variants
- **Text-to-Speech**: Listen to translations using your browser's built-in speech synthesis
- **Translation History**: Automatically saves your last 5 translations for quick access
- **Language Swapping**: One-click swap between source and target languages
- **Copy to Clipboard**: Instantly copy translations with a single click

### 🎨 User Experience

- **Modern Glassmorphism UI**: Beautiful frosted glass design with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Feedback**: Toast notifications for user actions and errors
- **Smooth Animations**: Powered by Motion (Framer Motion) for delightful interactions
- **Accessible**: Built with Radix UI components for proper keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd TranslaSense
   ```

2. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**

   Create a `.env.local` file in the `frontend` directory:

   ```bash
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## 📋 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 🌍 Supported Languages

TranslaSense supports over 100 languages and regional variants, including:

- **Major Languages**: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, Hindi, and many more
- **Regional Variants**: US/UK English, European/Latin American Spanish, Brazilian/European Portuguese, etc.
- **Languages with Script Support**: Arabic (العربية), Chinese (中文), Japanese (日本語), Korean (한국어), Hindi (हिन्दी), Thai (ไทย), and more

See `frontend/src/components/LanguageSelector.tsx` for the complete list.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **AI**: [OpenAI GPT-3.5 Turbo](https://platform.openai.com/docs/models/gpt-3-5)

## 📁 Project Structure

```
TranslaSense/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app router pages
│   │   ├── components/        # React components
│   │   │   ├── ui/           # Reusable UI components
│   │   │   ├── LanguageSelector.tsx
│   │   │   └── TranslationHistory.tsx
│   │   └── lib/              # Utility functions and configs
│   │       ├── config.ts     # API and translation config
│   │       ├── prompts.ts    # Tone prompts for AI
│   │       └── translation.ts # Translation API logic
│   ├── public/               # Static assets
│   └── package.json
└── README.md
```

## ⚙️ Configuration

### Translation Settings

You can customize translation behavior in `frontend/src/lib/config.ts`:

```typescript
export const TRANSLATION_CONFIG = {
  MODEL: "gpt-3.5-turbo", // OpenAI model to use
  MAX_TOKENS: 1000, // Maximum tokens per request
  TEMPERATURE: 0.3, // Model creativity (0-1)
};
```

### Customizing Tone Prompts

Edit `frontend/src/lib/prompts.ts` to customize or add new translation tones.

## 🚢 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
2. **Import your repository to Vercel**
3. **Configure the project**:
   - Set **Root Directory** to `frontend`
   - Add environment variable:
     - Key: `NEXT_PUBLIC_OPENAI_API_KEY`
     - Value: Your OpenAI API key
4. **Deploy!**

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render

Make sure to set the `NEXT_PUBLIC_OPENAI_API_KEY` environment variable in your hosting platform.

## 🔒 Security Notes

- **API Key Security**: The OpenAI API key is exposed to the client (via `NEXT_PUBLIC_` prefix). For production, consider:
  - Implementing a backend API route to proxy requests
  - Setting up rate limiting
  - Using server-side API routes in Next.js
- **Rate Limiting**: Be aware of OpenAI API rate limits and costs
- **Environment Variables**: Never commit `.env.local` files to version control

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ for breaking down language barriers

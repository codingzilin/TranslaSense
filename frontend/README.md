# TranslaSense - AI-Powered Translation Tool

A modern, responsive translation application built with Next.js and OpenAI GPT.

## Features

- 🌍 Multi-language support (10+ languages)
- 🤖 AI-powered translation using OpenAI GPT
- 📱 Responsive design for all devices
- 🎨 Modern UI with dark mode support
- ⚡ Real-time translation
- 📋 Copy translation results

## Setup

### 1. Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

## API Key Setup

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in the `frontend` directory
3. Add your API key: `NEXT_PUBLIC_OPENAI_API_KEY=sk-your-key-here`

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the **Root Directory** to `frontend`
3. Add environment variable in Vercel dashboard:
   - Key: `NEXT_PUBLIC_OPENAI_API_KEY`
   - Value: Your OpenAI API key
4. Deploy!

## Supported Languages

- English (en)
- Chinese (zh)
- Spanish (es)
- French (fr)
- German (de)
- Japanese (ja)
- Korean (ko)
- Russian (ru)
- Arabic (ar)
- Portuguese (pt)

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- OpenAI API
- Lucide React Icons

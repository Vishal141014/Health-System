# Healthcare AI Assistant

A multilingual healthcare application with AI-powered assistance, language selection, and health resources.

## Features

- 🤖 AI-powered health assistant using Google's Gemini API
- 🌐 Multi-language support (English, Hindi, Spanish, French)
- 🏥 Find nearby healthcare facilities
- 📰 Health articles and resources
- 🩺 Symptom checker
- 🌙 Dark mode support

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- Google Gemini API key

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/yourusername/healthcare-app.git
   cd healthcare-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Add your Gemini API key (Get one from [Google AI Studio](https://ai.google.dev/))
   ```bash
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Deployment

This app can be easily deployed to Vercel:

1. Push your code to GitHub (don't worry, the `.env` file with your API key is not included)
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard:
   - `VITE_GEMINI_API_KEY`
4. Deploy!

## Technologies Used

- React
- Tailwind CSS
- Firebase (optional)
- Google Gemini API
- React Router
- Framer Motion

## License

MIT 
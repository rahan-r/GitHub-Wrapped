# GitHub Wrapped 

A Spotify Wrapped-inspired web application that provides personalized analytics and insights for GitHub users. Get a fun, AI-powered analysis of your coding journey and contributions!

## Features

- **Personalized Analytics**: Get insights about your GitHub activity, coding patterns, and contributions
- **AI-Powered Analysis**: Powered by Google's Gemini 2.0 Flash AI model for intelligent insights
- **Interactive UI**: Modern, responsive design with smooth animations and transitions
- **Customizable Experience**: Adjust the "roast level" to control the intensity of AI analysis
- **Real-time Data**: Direct integration with GitHub API for up-to-date information



## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/github-wrapped.git
cd github-wrapped
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add your GitHub API key and Google Gemini API key:
```env
GITHUB_KEY=your_github_api_key
GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development servers:
```bash
# Start the backend server (from server directory)
npm start

# Start the frontend development server (from client directory)
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter your GitHub username
3. Adjust the roast level using the slider
4. Click "Generate GitHub Wrapped" to see your personalized analysis
5. Explore your coding journey insights and share them with others!


-

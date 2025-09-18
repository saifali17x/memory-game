# Memory Card Game

[![Demo](https://img.shields.io/badge/Demo-Live%20Site-blue.svg)](https://memory-game-sigma-two.vercel.app/)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB.svg)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF.svg)](https://vitejs.dev/)

A modern, responsive memory card game featuring Naruto characters. Built with React and Vite, this game challenges players to click unique cards without repeating any selection. Experience multiple difficulty levels, comprehensive score tracking, best time records, and an engaging orange gradient theme.

🎮 **[Play the Game](https://memory-game-sigma-two.vercel.app/)**

## ✨ Features

### 🎯 Game Mechanics

- **Three Difficulty Levels**: Easy (4 cards), Medium (8 cards), Hard (12 cards)
- **Score Tracking**: Real-time scoring with persistent best score records
- **Timer System**: Track completion times with per-difficulty best time records
- **Progressive Gameplay**: Cards reshuffle after each successful click

### 🎨 User Experience

- **Responsive Design**: Optimized for desktop and mobile devices
- **Animated UI**: Smooth transitions and visual feedback
- **Sound Effects**: Card shuffle sounds and background music
- **Persistent Storage**: Save progress and statistics locally
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Technologies Used

- **React 19.1.1**: Frontend library for building user interfaces
- **Vite 7.1.2**: Next-generation frontend build tool
- **ESLint 9.33.0**: Static code analysis for code quality
- **CSS3**: Modern styling with custom properties and animations
- **Jikan API**: Anime character data source

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/saifali17x/memory-game.git
   cd memory-game
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🎮 How to Play

1. **Choose Difficulty**: Select Easy, Medium, or Hard from the dropdown menu
2. **Start Playing**: Click on character cards to reveal them
3. **Avoid Repeats**: Don't click the same card twice - this will reset your progress!
4. **Win Condition**: Successfully click all unique cards in the current difficulty
5. **Track Progress**: Monitor your score, time, and best records
6. **Controls**:
   - 🔄 **New Game**: Restart the current session
   - 🔊/🔇 **Music Toggle**: Enable/disable background music

> **Pro Tip**: Cards reshuffle after each successful click, so memorizing positions won't help!

## Project Structure

```
memory-game/
├── public/
│   └── vite.svg                # Vite favicon
├── src/
│   ├── assets/                 # Static assets
│   │   ├── card-sounds-35956.mp3  # Shuffle sound effect
│   │   ├── fallback.png        # Fallback image for cards
│   │   ├── naruto_flute.mp3    # Background music
│   │   └── react.svg           # React logo
│   ├── components/             # React components
│   │   ├── Card.jsx            # Individual card component
│   │   ├── CardGrid.jsx        # Grid layout for cards
│   │   ├── Footer.jsx          # Footer component
│   │   ├── Header.jsx          # Header with controls
│   │   └── Scoreboard.jsx      # Game statistics display
│   ├── styles/                 # CSS files
│   │   ├── App.css             # Global styles and variables
│   │   ├── Card.css            # Card styling
│   │   ├── Footer.css          # Footer styling
│   │   ├── Header.css          # Header styling
│   │   └── Scoreboard.css      # Scoreboard styling
│   ├── utils/                  # Utility functions
│   │   ├── gameExtras.js       # Game-related utilities
│   │   └── shuffle.jsx         # Array shuffling function
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # Entry point
├── .eslintrc.cjs               # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Project dependencies
├── vite.config.js              # Vite configuration
```

## 🚀 Deployment

This project is deployed on Vercel for optimal performance and reliability.

**Live Demo**: [https://memory-game-sigma-two.vercel.app/](https://memory-game-sigma-two.vercel.app/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jikan API** for providing anime character data
- **Naruto** franchise for character imagery
- **Vercel** for hosting and deployment
- **React** and **Vite** communities for excellent tooling

## 👨‍💻 Author

**Saif Ali**

- GitHub: [@saifali17x](https://github.com/saifali17x)

---

Made with ❤️ and lots of ☕

# Birthday Website for Alsa 🎂💝

A cute and interactive birthday website featuring a personalized landing page and an exciting blind box unboxing simulator!

## Features

### 🏠 Landing Page
- Beautiful gradient background with floating hearts animation
- Personalized notes section (easily customizable)
- Cute baby blue theme with pink accents
- Smooth animations and transitions
- Link to the surprise unboxing page

### 🎁 Blind Box Unboxing Simulator
- Interactive mystery box opening experience
- Exciting animations with sparkles and confetti
- 4 rarity tiers: Common, Rare, Epic, and Legendary
- 10 different collectible items
- Persistent inventory system (saves to localStorage)
- Real-time item counter
- Beautiful rarity-based color coding

## Getting Started

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` folder.

## Customization Guide

### Personalizing the Notes

Edit the `notes` array in \`src/pages/HomePage.jsx\` (around line 9):

\`\`\`javascript
const [notes] = useState([
  { id: 1, title: "Why I Love You", content: "Your personal message here..." },
  { id: 2, title: "Our Favorite Memories", content: "Add your memories..." },
  { id: 3, title: "What Makes You Special", content: "Write what makes her special..." },
])
\`\`\`

### Adding More Unboxing Items

Edit the `ITEMS` array in \`src/pages/UnboxingPage.jsx\` (around line 6):

\`\`\`javascript
const ITEMS = [
  { id: 11, name: "🎵 Your Favorite Song", rarity: "rare", emoji: "🎵" },
  // Add more items...
]
\`\`\`

### Changing Colors

The main theme colors are in the CSS files:
- Baby blue: `#89CFF0`
- Pink: `#FF69B4`
- Purple: `#DDA0DD`

You can adjust these in the respective CSS files to match her preferences!

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool
- **React Router** - Page navigation
- **Framer Motion** - Smooth animations
- **CSS3** - Styling with gradients and effects

## Tips

- The inventory is saved in the browser's localStorage, so collections persist between visits
- Items have different drop rates: Common (50%), Rare (30%), Epic (15%), Legendary (5%)
- You can reset the inventory by clearing the browser's localStorage

## Deploying

You can deploy this to:
- **Vercel**: `npm i -g vercel && vercel`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package

Enjoy creating a special birthday surprise! 🎉✨

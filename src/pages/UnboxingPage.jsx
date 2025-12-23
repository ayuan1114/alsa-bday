import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './UnboxingPage.css'

// Asset paths from public folder
const aaronSprite = './assets/aaron_sprite.png'
const aaronWizSprite = './assets/aaron_wiz_sprite.png'
const alsaBubuSprite = './assets/alsa_bubu_sprite.png'
const alsaSprite = './assets/alsa_sprite.png'
const alsaWitchSprite = './assets/alsa_witch_sprite.png'
const helloKittyPjSprite = './assets/hello_kitty_pj_sprite.png'
const helloKittySprite = './assets/hello_kitty_sprite.png'
const lickitungShiny = './assets/lickitung_shiny.png'
const lickitungSprite = './assets/lickitung_sprite.png'
const stitchSprite = './assets/stitch_sprite.png'
const alsaBox = './assets/alsa_box.png'
const ITEMS = [
  { id: 1, name: "Hello Kitty", rarity: "common", image: helloKittySprite },
  { id: 2, name: "Stitch", rarity: "common", image: stitchSprite },
  { id: 3, name: "Lickitung", rarity: "common", image: lickitungSprite },
  { id: 4, name: "Tushy", rarity: "rare", image: aaronSprite },
  { id: 5, name: "Allyssa", rarity: "rare", image: alsaSprite },
  { id: 6, name: "PJ Hello Kitty", rarity: "rare", image: helloKittyPjSprite },
  { id: 7, name: "Shiny Lickitung", rarity: "rare", image: lickitungShiny },
  { id: 8, name: "Wizard Tushy", rarity: "epic", image: aaronWizSprite },
  { id: 9, name: "Witch Allyssa", rarity: "epic", image: alsaWitchSprite },
  { id: 10, name: "Allybubu", rarity: "legendary", image: alsaBubuSprite },
]

const UNBOXING_DURATION = 3 // seconds

function UnboxingPage() {
  const [inventory, setInventory] = useState({})
  const [showInventory, setShowInventory] = useState(false)
  const [isUnboxing, setIsUnboxing] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [miniExplosionPositions, setMiniExplosionPositions] = useState([])

  // Load inventory from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('birthday-inventory')
    if (saved) {
      setInventory(JSON.parse(saved))
    }
  }, [])

  // Save inventory to localStorage
  useEffect(() => {
    localStorage.setItem('birthday-inventory', JSON.stringify(inventory))
  }, [inventory])

  const getRarityColor = (rarity) => {
    const colors = {
      common: '#A8DADC',
      rare: '#89CFF0',
      epic: '#DDA0DD',
      legendary: '#FFD700',
    }
    return colors[rarity] || '#89CFF0'
  }

  const getRandomItem = () => {
    const rand = Math.random() * 100
    let filteredItems
    
    if (rand < 50) {
      filteredItems = ITEMS.filter(item => item.rarity === 'common')
    } else if (rand < 80) {
      filteredItems = ITEMS.filter(item => item.rarity === 'rare')
    } else if (rand < 95) {
      filteredItems = ITEMS.filter(item => item.rarity === 'epic')
    } else {
      filteredItems = ITEMS.filter(item => item.rarity === 'legendary')
    }

    return filteredItems[Math.floor(Math.random() * filteredItems.length)]
  }

  const handleUnbox = () => {
    if (isUnboxing) return

    // Generate random positions for mini explosions
    setMiniExplosionPositions([
      { x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200 },
      { x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200 },
      { x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200 },
      { x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200 },
    ])

    setIsUnboxing(true)
    setShowResult(false)
    setCurrentItem(null)

    // Simulate unboxing animation
    setTimeout(() => {
      const item = getRandomItem()
      setCurrentItem(item)
      
      // Update inventory
      setInventory(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1
      }))

      setTimeout(() => {
        setShowResult(true)
        setIsUnboxing(false)
      }, 500)
    }, 3000)
  }

  const getTotalItems = () => {
    return Object.values(inventory).reduce((sum, count) => sum + count, 0)
  }

  const getUniqueItems = () => {
    return Object.keys(inventory).length
  }

  return (
    <div className="unboxing-page">
      {/* Sparkles background */}
      <div className="sparkles-background">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="sparkle"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0 
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="unboxing-content">
        <motion.div
          className="top-bar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" className="back-button">
            ← Back Home
          </Link>
          <motion.button
            className="inventory-button"
            onClick={() => setShowInventory(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎒 Inventory ({getTotalItems()})
          </motion.button>
        </motion.div>

        <motion.h1
          className="unboxing-title"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎁 Mystery Box Unboxing 🎁
        </motion.h1>

        <div className="unboxing-area">
          <AnimatePresence mode="wait">
            {!isUnboxing && !showResult && (
              <motion.div
                key="box"
                className="box-container"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <motion.div
                  className="mystery-box"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img src={alsaBox} alt="Mystery Box" style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
                </motion.div>
                <motion.button
                  className="open-box-button"
                  onClick={handleUnbox}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Open Box!
                </motion.button>
              </motion.div>
            )}

            {isUnboxing && (
              <motion.div
                key="unboxing"
                className="unboxing-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="box-opening"
                  animate={{
                    // Shake 3 times while growing
                    rotate: [2, -15, -2, 0, 0, -2, 15, 2, 0, 0, 2, -15, -2, 0, 0, -2, 12, -15, 10, 0],
                    scale: [1, 1.05, 1.05, 1.05, 1.05, 1.05, 1.1, 1.1, 1.1, 1.1, 1.1, 1.15, 1.15, 1.15, 1.15, 1.15, 1.2, 1.25, 1.3, 1.35],
                    y: [0, -5, 0, -5, 0, -10, 0, -15],
                  }}
                  transition={{ 
                    duration: UNBOXING_DURATION,
                    times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75, 0.3],
                    ease: "easeInOut"
                  }}
                >
                  <img src={alsaBox} alt="Opening Box" style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
                </motion.div>
                
                {/* Mini explosion - First shake */}
                <motion.div
                  className="mini-pop"
                  initial={{ 
                    scale: 0, 
                    opacity: 0,
                    x: miniExplosionPositions[0]?.x || 0,
                    y: miniExplosionPositions[0]?.y || 0
                  }}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: UNBOXING_DURATION * 0.05,
                    ease: "easeOut"
                  }}
                >
                  💥
                </motion.div>
                
                {/* Mini explosion - Second shake */}
                <motion.div
                  className="mini-pop"
                  initial={{ 
                    scale: 0, 
                    opacity: 0,
                    x: miniExplosionPositions[1]?.x || 0,
                    y: miniExplosionPositions[1]?.y || 0
                  }}
                  animate={{ 
                    scale: [0, 1.6, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: UNBOXING_DURATION * 0.30,
                    ease: "easeOut"
                  }}
                >
                  💥
                </motion.div>
                
                {/* Mini explosion - Third shake */}
                <motion.div
                  className="mini-pop"
                  initial={{ 
                    scale: 0, 
                    opacity: 0,
                    x: miniExplosionPositions[2]?.x || 0,
                    y: miniExplosionPositions[2]?.y || 0
                  }}
                  animate={{ 
                    scale: [0, 1.7, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: UNBOXING_DURATION * 0.55,
                    ease: "easeOut"
                  }}
                >
                  💥
                </motion.div>
                  
                {/* Mini explosion - Fourth shake */}
                <motion.div
                  className="mini-pop"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.8, 0],
                    opacity: [0, 0.8, 0],
                    x: miniExplosionPositions[3]?.x || 0,
                    y: miniExplosionPositions[3]?.y || 0
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: UNBOXING_DURATION * 0.8,
                    ease: "easeOut"
                  }}
                >
                  💥
                </motion.div>
                

                {/* Big explosion at the end */}
                <motion.div
                  className="box-pop"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 3, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 0.4,
                    delay: UNBOXING_DURATION,
                    ease: "easeOut"
                  }}
                >
                  💥
                </motion.div>
                <motion.div
                  className="reveal-rays"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 4], opacity: [0, 0.8, 0] }}
                  transition={{ 
                    duration: 0.6,
                    delay: UNBOXING_DURATION,
                  }}
                >
                  ✨
                </motion.div>
              </motion.div>
            )}

            {showResult && currentItem && (
              <motion.div
                key="result"
                className="result-container"
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <motion.div
                  className="confetti-burst"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 2, 0] }}
                  transition={{ duration: 1 }}
                >
                  🎉
                </motion.div>
                
                <motion.div
                  className="item-reveal"
                  style={{ 
                    background: `linear-gradient(135deg, ${getRarityColor(currentItem.rarity)}40, ${getRarityColor(currentItem.rarity)}80)`,
                    border: `4px solid ${getRarityColor(currentItem.rarity)}`
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${getRarityColor(currentItem.rarity)}`,
                      `0 0 40px ${getRarityColor(currentItem.rarity)}`,
                      `0 0 20px ${getRarityColor(currentItem.rarity)}`
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="item-emoji">
                    <img src={currentItem.image} alt={currentItem.name} style={{ width: '150px', height: '200px', objectFit: 'contain' }} />
                  </div>
                  <div className="item-name">{currentItem.name}</div>
                  <div 
                    className="item-rarity"
                    style={{ color: getRarityColor(currentItem.rarity) }}
                  >
                    {currentItem.rarity.toUpperCase()}
                  </div>
                </motion.div>

                <motion.button
                  className="unbox-again-button"
                  onClick={handleUnbox}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Open Another! 🎁
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Inventory Modal */}
      <AnimatePresence>
        {showInventory && (
          <motion.div
            className="inventory-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInventory(false)}
          >
            <motion.div
              className="inventory-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="inventory-header">
                <h2>🎒 Your Collection</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowInventory(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="inventory-stats">
                <div className="stat">
                  <span className="stat-label">Total Items:</span>
                  <span className="stat-value">{getTotalItems()}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Unique Items:</span>
                  <span className="stat-value">{getUniqueItems()}/{ITEMS.length}</span>
                </div>
              </div>

              <div className="inventory-grid">
                {ITEMS.map((item) => {
                  const count = inventory[item.id] || 0
                  return (
                    <motion.div
                      key={item.id}
                      className={`inventory-item ${count > 0 ? 'obtained' : 'locked'}`}
                      style={{
                        borderColor: count > 0 ? getRarityColor(item.rarity) : '#ccc'
                      }}
                      whileHover={count > 0 ? { scale: 1.05 } : {}}
                    >
                      <div className="item-icon">
                        {count > 0 ? (
                          <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                        ) : (
                          '❓'
                        )}
                      </div>
                      <div className="item-info">
                        <div className="item-label">{count > 0 ? item.name : '???'}</div>
                        {count > 0 && (
                          <div 
                            className="item-count"
                            style={{ color: getRarityColor(item.rarity) }}
                          >
                            ×{count}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UnboxingPage

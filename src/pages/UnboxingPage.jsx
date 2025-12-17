import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './UnboxingPage.css'

const ITEMS = [
  { id: 1, name: "💝 Love Letter", rarity: "common", emoji: "💝" },
  { id: 2, name: "🌸 Flower Bouquet", rarity: "common", emoji: "🌸" },
  { id: 3, name: "🍰 Birthday Cake", rarity: "common", emoji: "🍰" },
  { id: 4, name: "🎀 Cute Ribbon", rarity: "common", emoji: "🎀" },
  { id: 5, name: "✨ Sparkles", rarity: "rare", emoji: "✨" },
  { id: 6, name: "🦄 Unicorn", rarity: "rare", emoji: "🦄" },
  { id: 7, name: "🌈 Rainbow", rarity: "rare", emoji: "🌈" },
  { id: 8, name: "💎 Diamond", rarity: "epic", emoji: "💎" },
  { id: 9, name: "👑 Crown", rarity: "epic", emoji: "👑" },
  { id: 10, name: "🌟 Golden Star", rarity: "legendary", emoji: "🌟" },
]

function UnboxingPage() {
  const [inventory, setInventory] = useState({})
  const [showInventory, setShowInventory] = useState(false)
  const [isUnboxing, setIsUnboxing] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [showResult, setShowResult] = useState(false)

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
    }, 2000)
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
                  🎁
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
                    scale: [1, 1.2, 1.5, 2],
                    rotate: [0, 180, 360, 720],
                    opacity: [1, 1, 1, 0],
                  }}
                  transition={{ duration: 2 }}
                >
                  🎁
                </motion.div>
                <motion.div
                  className="reveal-rays"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 3, opacity: [0, 1, 0] }}
                  transition={{ duration: 2 }}
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
                  <div className="item-emoji">{currentItem.emoji}</div>
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
                      <div className="item-icon">{count > 0 ? item.emoji : '❓'}</div>
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

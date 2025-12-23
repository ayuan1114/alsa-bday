import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './HomePage.css'

function HomePage() {
  const [message] = useState(`Dear Allyssa,

Happy Birthday to the most wonderful person in my life! 🎂💝

I wanted to take a moment to tell you how much you mean to me...

[Write your heartfelt message here. Share your feelings, memories, and what makes her special to you.]

I hope your day is filled with joy, laughter, and all the happiness you deserve.

With all my love,
Aaron

P.S. I have a special surprise for you below! 🎁`)

  return (
    <div className="home-page">
      {/* Floating hearts background */}
      <div className="hearts-background">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart"
            initial={{ y: '100vh', x: Math.random() * window.innerWidth }}
            animate={{
              y: '-100vh',
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            💗
          </motion.div>
        ))}
      </div>

      <div className="content-wrapper">
        <motion.div
          className="header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="title">
            Happy Birthday!
          </h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            ✨ To the most amazing person in my life ✨
          </motion.p>
        </motion.div>

        <motion.div
          className="notebook-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.div
            className="notebook-page"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="notebook-lines">
              <div className="notebook-header">
                <div className="date-label">December 29, 2025 🎂</div>
              </div>
              <pre className="message-content">{message}</pre>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <p className="cta-text">I have a special surprise for you! 🎁</p>
          <Link to="/unboxing">
            <motion.button
              className="unbox-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Open Mystery Boxes ✨
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage

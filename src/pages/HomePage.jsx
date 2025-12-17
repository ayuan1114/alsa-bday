import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './HomePage.css'

function HomePage() {
  const [notes] = useState([
    { id: 1, title: "Why I Love You", content: "You can edit this with your personal message..." },
    { id: 2, title: "Our Favorite Memories", content: "Add your special memories here..." },
    { id: 3, title: "What Makes You Special", content: "Write what makes her special to you..." },
  ])

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
            🎂 Happy Birthday! 🎂
          </h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            To the most amazing person in my life ✨
          </motion.p>
        </motion.div>

        <motion.div
          className="notes-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              className="note-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
            >
              <h3 className="note-title">{note.title}</h3>
              <p className="note-content">{note.content}</p>
            </motion.div>
          ))}
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

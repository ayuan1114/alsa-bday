import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './HomePage.css'

function HomePage() {
  const [message] = useState(`Dear Allyssa,

Happy birthday to the coolest, cutest, awesomest, kindest, prettiest, sweetest person in my life!

Everyday I am so grateful to have you in my life and by my side, especially during the last year. I was so happy that you got to visit me in California and meet my parents. Even if it did not go perfectly, it was still so much fun for me to be able to show you around and I hope you enjoyed it despite the challenges too. I especially loved showing you some of my favorite restraunt spots (Zareen's, Pho Ha Noi, In-n-Out, and I loved trying Curry Hyuga with you too) and shopping with you too (you always help me pick out some of my favorite clothing pieces). Even thought we did not get to do all the things we planned, I am sure that we will have many more chances to explore California again and even other places together. I can't wait to bring you around to proper vacation places like the Santa Barbara pier, Universal Studios Hollywood, the Golden Gate Bridge and so many other places. Not to mention all the cool places I want to take you around the world too!

I think that my excitement to explore with you in our adulthood is what drives me to work hard everyday the most. Speaking of which, it was so amazing to be able to hang out with you this semester. I loved hanging out together all the time in my room and especially being able to work together on our Capstone project (which I hope you are so proud of, I was amazed by your ability to take on so many roles and contribute in so many ways without as much technical backgorund). Even though we could not sleep together in the same bed every night like we had so many times before, I always looked forward to seeing you everyday especially in the morning when I get to wake up to see you! I also loved our late night cuddles when you could stay over and all the time we got to spend cooking together. I can't wait to live like this with you for the rest of my life and be able to wake up with you in my arms every morning. I also can't wait for when we are both successful in our careers and comfortable together and can just chill and explore together, nothing in the world would make me happier. I hope the both of us will continue to work hard for our future together and that both of us can get some good opportunities for the upcoming summer. I will always be here to support you and cheer you on no matter what and I love that you do the same for me. I truly don't know what I would do without you and everyday I am so happy to have you. When you are sad, stressed, happy or upset, I love being with you through it all.

I know that the holiday season and your birthday are not your favorite times of the year, and I really wish I could be with you to celebrate in person. But I hope that this letter and my website bring you some joy during your special day.

With all my love,
Aaron (your Tushy)

P.S. There is a surprise below! 🎁`)

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
          <p className="cta-text">Woah! What is this?</p>
          <Link to="/unboxing">
            <motion.button
              className="unbox-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Blind Box (Maybe?)
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { floatingButtonVariants, tooltipVariants } from '../../animations/variants'

const AIVoiceAssistant = () => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    window.open('https://neura-product-support-e4skmk.sandbox.livekit.io/', '_blank')
  }

  return (
    <motion.div
      className="fixed top-6 left-6 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          variants={tooltipVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm whitespace-nowrap pointer-events-none"
        >
          AI Voice Assistant
        </motion.div>
      )}

      {/* Glow Circle Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-teal to-brand-purple blur-lg opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main Button */}
      <motion.button
        variants={floatingButtonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full bg-gradient-brand flex items-center justify-center text-white shadow-lg cursor-pointer border-2 border-white/20 backdrop-blur-md"
      >
        <MessageCircle size={28} />
      </motion.button>
    </motion.div>
  )
}

export default AIVoiceAssistant

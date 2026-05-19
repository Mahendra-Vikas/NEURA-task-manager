import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { floatingButtonVariants, tooltipVariants } from '../../animations/variants'

const FloatingDoubts = () => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    window.open('https://neura-product-support.document360.io/', '_blank')
  }

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          variants={tooltipVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm whitespace-nowrap pointer-events-none"
        >
          Help & Doubts
        </motion.div>
      )}

      {/* Glow Circle Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-purple to-brand-orange blur-lg opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
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
        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-brand-purple to-brand-orange flex items-center justify-center text-white shadow-lg cursor-pointer border-2 border-white/20 backdrop-blur-md"
      >
        <HelpCircle size={28} />
      </motion.button>
    </motion.div>
  )
}

export default FloatingDoubts

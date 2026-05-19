// Animation variants for Framer Motion
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const pageTransition = {
  duration: 0.3,
  ease: 'easeInOut'
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
}

export const cardHoverVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.3 }
  }
}

export const floatingButtonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    boxShadow: '0 0 40px rgba(0, 191, 165, 0.8)'
  },
  tap: { scale: 0.95 }
}

export const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' }
}

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export const tooltipVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 }
  }
}

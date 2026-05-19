import React from 'react'
import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../components/ui'
import { containerVariants, itemVariants } from '../animations/variants'

const Welcome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const features = [
    {
      title: 'Authentication',
      description: 'JWT-based login/signup with secure password hashing'
    },
    {
      title: 'Dashboard',
      description: 'Modern dashboard with analytics and activity tracking'
    },
    {
      title: 'Dark Mode',
      description: 'Beautiful dark/light theme toggle with smooth transitions'
    },
    {
      title: 'Responsive',
      description: 'Mobile-first design that works on all devices'
    },
    {
      title: 'AI Assistant',
      description: 'Floating AI voice assistant widget with premium UI'
    },
    {
      title: 'Help Center',
      description: 'Quick access to knowledge base and documentation'
    }
  ]

  return (
    <div className="min-h-screen bg-brand-lightGray dark:bg-brand-charcoal">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="pt-20 md:ml-0 transition-all">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="text-center py-12">
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
                Welcome to Kovai Starter
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A production-ready MERN SaaS template for rapid hackathon deployment and enterprise-scale applications.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Features Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="bg-gradient-brand rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-3">Frontend</h3>
                  <ul className="space-y-1 text-sm">
                    <li>✓ React 18 + Vite</li>
                    <li>✓ React Router</li>
                    <li>✓ Tailwind CSS</li>
                    <li>✓ Framer Motion</li>
                    <li>✓ Axios</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">Backend</h3>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Node.js</li>
                    <li>✓ Express</li>
                    <li>✓ JWT Auth</li>
                    <li>✓ Bcryptjs</li>
                    <li>✓ CORS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">Database</h3>
                  <ul className="space-y-1 text-sm">
                    <li>✓ MongoDB</li>
                    <li>✓ Mongoose</li>
                    <li>✓ Schema Validation</li>
                    <li>✓ Indexing</li>
                    <li>✓ Timestamps</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Next Steps
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Read the Documentation</h3>
                    <p className="text-gray-600 dark:text-gray-400">Check README.md for overview and INSTALLATION.md for setup</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Customize Your Brand</h3>
                    <p className="text-gray-600 dark:text-gray-400">Update colors, logos, and texts in configuration files</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Add Your Features</h3>
                    <p className="text-gray-600 dark:text-gray-400">Use DEVELOPER_GUIDE.md to add new pages, components, and APIs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Deploy to Production</h3>
                    <p className="text-gray-600 dark:text-gray-400">Follow DEPLOYMENT.md to deploy on Vercel and Railway/Heroku</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Welcome

import React from 'react'
import { Card } from '../components/ui'
import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import { useState } from 'react'

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-brand-lightGray dark:bg-brand-charcoal">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="pt-20 md:ml-0 transition-all">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Settings
          </h1>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Profile Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Update your profile information and preferences here.
              </p>
            </Card>

            {/* Security Settings */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Security
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your password and security settings.
              </p>
            </Card>

            {/* Notification Settings */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Notifications
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure your notification preferences.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings

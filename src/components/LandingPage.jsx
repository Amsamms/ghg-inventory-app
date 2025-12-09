import { Link } from 'react-router-dom'

export default function LandingPage() {
  const cards = [
    {
      id: 'database',
      title: 'Project Database',
      description: 'Access the MIDOR GHG Inventory with detailed emissions data across all scopes and categories.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      link: '/database',
      enabled: true,
      color: 'blue'
    },
    {
      id: 'uncertainty',
      title: 'Uncertainty References',
      description: 'View reference documents and guidelines for activity data and emission factor uncertainties.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: '/uncertainty',
      enabled: true,
      color: 'green'
    },
    {
      id: 'powerbi',
      title: 'Power BI Dashboard',
      description: 'Interactive visualizations and analytics dashboard for GHG emissions data.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: null,
      enabled: false,
      color: 'yellow'
    }
  ]

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 hover:bg-blue-100',
      border: 'border-blue-500',
      icon: 'text-blue-600',
      title: 'text-blue-800'
    },
    green: {
      bg: 'bg-green-50 hover:bg-green-100',
      border: 'border-green-500',
      icon: 'text-green-600',
      title: 'text-green-800'
    },
    yellow: {
      bg: 'bg-gray-50',
      border: 'border-gray-300',
      icon: 'text-gray-400',
      title: 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">MIDOR GHG Inventory</h1>
          <p className="text-xl text-gray-600">Greenhouse Gas Emissions Management System</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const colors = colorClasses[card.color]

            if (card.enabled) {
              return (
                <Link
                  key={card.id}
                  to={card.link}
                  className={`block rounded-xl shadow-lg p-8 border-l-4 transition-all duration-200 transform hover:scale-105 ${colors.bg} ${colors.border}`}
                >
                  <div className={`mb-4 ${colors.icon}`}>
                    {card.icon}
                  </div>
                  <h2 className={`text-2xl font-bold mb-3 ${colors.title}`}>
                    {card.title}
                  </h2>
                  <p className="text-gray-600">
                    {card.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-blue-600">
                    Open →
                  </div>
                </Link>
              )
            } else {
              return (
                <div
                  key={card.id}
                  className={`rounded-xl shadow-lg p-8 border-l-4 cursor-not-allowed ${colors.bg} ${colors.border}`}
                >
                  <div className={`mb-4 ${colors.icon}`}>
                    {card.icon}
                  </div>
                  <h2 className={`text-2xl font-bold mb-3 ${colors.title}`}>
                    {card.title}
                  </h2>
                  <p className="text-gray-400">
                    {card.description}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-gray-200 text-gray-500 text-sm rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              )
            }
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>MIDOR Greenhouse Gas Inventory Management System</p>
        </div>
      </div>
    </div>
  )
}

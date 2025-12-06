import { Link, useSearchParams } from 'react-router-dom'
import data from '../data/activities.json'

const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toFixed(2)
}

const SCOPE_COLORS = {
  1: '#3B82F6',
  2: '#10B981',
  3: '#F59E0B'
}

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const results = data.activities.filter(activity => {
    const searchLower = query.toLowerCase()
    return (
      activity.activity?.toLowerCase().includes(searchLower) ||
      activity.description?.toLowerCase().includes(searchLower) ||
      activity.category?.toLowerCase().includes(searchLower) ||
      activity.adSource?.toLowerCase().includes(searchLower) ||
      activity.efSource?.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm">
        <Link to="/" className="text-blue-600 hover:underline">Dashboard</Link>
        <span className="mx-2 text-gray-400">→</span>
        <span className="text-gray-600">Search Results</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Search Results</h1>
        <p className="text-gray-600 mt-1">
          {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
        </p>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No activities found matching "{query}"</p>
          <p className="text-gray-400 mt-2">Try searching for activity names, categories, or sources</p>
          <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((activity) => (
            <Link
              key={activity.id}
              to={`/activity/${activity.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: SCOPE_COLORS[activity.scope] }}
                      >
                        Scope {activity.scope}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">{activity.category}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      {activity.activity !== 'N/A' ? activity.activity : activity.description}
                    </h3>
                    {activity.activity !== 'N/A' && activity.description !== 'N/A' && (
                      <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                    )}
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                      <span>EF: {activity.emissionFactor} {activity.efUnit}</span>
                      <span>Source: {activity.efSource}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-lg font-bold" style={{ color: SCOPE_COLORS[activity.scope] }}>
                      {formatNumber(activity.totalEmissions)} tCO2e
                    </p>
                    <p className="text-xs text-gray-400">
                      {activity.percentOfTotal.toFixed(3)}% of total
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                  View details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

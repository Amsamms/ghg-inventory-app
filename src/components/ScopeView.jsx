import { Link, useParams } from 'react-router-dom'
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

export default function ScopeView() {
  const { scopeId } = useParams()
  const scope = data.scopes.find(s => s.id === parseInt(scopeId))

  if (!scope) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold text-red-600">Scope not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  const scopeActivities = data.activities.filter(a => a.scope === scope.id)

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm">
        <Link to="/" className="text-blue-600 hover:underline">Dashboard</Link>
        <span className="mx-2 text-gray-400">→</span>
        <span className="text-gray-600">{scope.name}</span>
      </div>

      {/* Scope Header */}
      <div
        className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4"
        style={{ borderLeftColor: SCOPE_COLORS[scope.id] }}
      >
        <h1 className="text-2xl font-bold text-gray-800">{scope.name}</h1>
        <div className="flex flex-wrap gap-6 mt-4">
          <div>
            <p className="text-sm text-gray-500">Total Emissions</p>
            <p className="text-2xl font-bold" style={{ color: SCOPE_COLORS[scope.id] }}>
              {formatNumber(scope.totalEmissions)} tCO2e
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">% of Total Inventory</p>
            <p className="text-2xl font-bold text-gray-800">{scope.percentOfTotal.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Activities</p>
            <p className="text-2xl font-bold text-gray-800">{scopeActivities.length}</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
      <div className="space-y-4">
        {scope.categories.map((category) => (
          <Link
            key={category.name}
            to={`/scope/${scopeId}/category/${encodeURIComponent(category.name)}`}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {category.activityCount} {category.activityCount === 1 ? 'activity' : 'activities'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold" style={{ color: SCOPE_COLORS[scope.id] }}>
                    {category.percentOfScope.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-400">of {scope.name}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(category.percentOfScope, 100)}%`,
                    backgroundColor: SCOPE_COLORS[scope.id]
                  }}
                />
              </div>

              <div className="mt-3 flex justify-between text-sm text-gray-600">
                <span>{formatNumber(category.totalEmissions)} tCO2e</span>
                <span>{category.percentOfTotal.toFixed(2)}% of total inventory</span>
              </div>

              <div className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                View activities →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

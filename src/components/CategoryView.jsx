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

export default function CategoryView() {
  const { scopeId, categoryName } = useParams()
  const decodedCategoryName = decodeURIComponent(categoryName)
  const scope = data.scopes.find(s => s.id === parseInt(scopeId))
  const category = scope?.categories.find(c => c.name === decodedCategoryName)
  const activities = data.activities.filter(
    a => a.scope === parseInt(scopeId) && a.category === decodedCategoryName
  )

  if (!scope || !category) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold text-red-600">Category not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm">
        <Link to="/" className="text-blue-600 hover:underline">Dashboard</Link>
        <span className="mx-2 text-gray-400">→</span>
        <Link to={`/scope/${scopeId}`} className="text-blue-600 hover:underline">{scope.name}</Link>
        <span className="mx-2 text-gray-400">→</span>
        <span className="text-gray-600 capitalize">{decodedCategoryName}</span>
      </div>

      {/* Category Header */}
      <div
        className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4"
        style={{ borderLeftColor: SCOPE_COLORS[scope.id] }}
      >
        <h1 className="text-2xl font-bold text-gray-800 capitalize">{decodedCategoryName}</h1>
        <p className="text-gray-500">{scope.name}</p>

        <div className="flex flex-wrap gap-6 mt-4">
          <div>
            <p className="text-sm text-gray-500">Total Emissions</p>
            <p className="text-2xl font-bold" style={{ color: SCOPE_COLORS[scope.id] }}>
              {formatNumber(category.totalEmissions)} tCO2e
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">% of {scope.name}</p>
            <p className="text-2xl font-bold text-gray-800">{category.percentOfScope.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">% of Total Inventory</p>
            <p className="text-2xl font-bold text-gray-800">{category.percentOfTotal.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Activities</p>
            <p className="text-2xl font-bold text-gray-800">{activities.length}</p>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Activities</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to={`/activity/${activity.id}`}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {activity.activity !== 'N/A' ? activity.activity : activity.description}
                  </h3>
                  {activity.activity !== 'N/A' && activity.description !== 'N/A' && (
                    <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                    <span>EF: {activity.emissionFactor} {activity.efUnit}</span>
                    <span>AD: {formatNumber(activity.activityDataValue)} {activity.activityDataUnit}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg font-bold" style={{ color: SCOPE_COLORS[scope.id] }}>
                    {formatNumber(activity.totalEmissions)} tCO2e
                  </p>
                  <p className="text-xs text-gray-400">
                    {activity.percentOfCategory.toFixed(1)}% of category
                  </p>
                </div>
              </div>

              {/* Mini progress bar */}
              <div className="mt-3 bg-gray-200 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${Math.min(activity.percentOfCategory, 100)}%`,
                    backgroundColor: SCOPE_COLORS[scope.id]
                  }}
                />
              </div>

              <div className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                View details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

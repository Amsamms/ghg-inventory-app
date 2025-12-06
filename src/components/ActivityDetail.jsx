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

export default function ActivityDetail() {
  const { activityId } = useParams()
  const activity = data.activities.find(a => a.id === parseInt(activityId))

  if (!activity) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold text-red-600">Activity not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  const scope = data.scopes.find(s => s.id === activity.scope)

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm">
        <Link to="/" className="text-blue-600 hover:underline">Dashboard</Link>
        <span className="mx-2 text-gray-400">→</span>
        <Link to={`/scope/${activity.scope}`} className="text-blue-600 hover:underline">
          Scope {activity.scope}
        </Link>
        <span className="mx-2 text-gray-400">→</span>
        <Link
          to={`/scope/${activity.scope}/category/${encodeURIComponent(activity.category)}`}
          className="text-blue-600 hover:underline capitalize"
        >
          {activity.category}
        </Link>
        <span className="mx-2 text-gray-400">→</span>
        <span className="text-gray-600">Activity</span>
      </div>

      {/* Main Header Card */}
      <div
        className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4"
        style={{ borderLeftColor: SCOPE_COLORS[activity.scope] }}
      >
        <div className="flex items-start justify-between">
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-2"
              style={{ backgroundColor: SCOPE_COLORS[activity.scope] }}
            >
              Scope {activity.scope}
            </span>
            <h1 className="text-2xl font-bold text-gray-800">
              {activity.activity !== 'N/A' ? activity.activity : 'Activity'}
            </h1>
            <p className="text-gray-600 mt-1">{activity.description}</p>
            <p className="text-gray-400 text-sm mt-1 capitalize">{activity.category}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold" style={{ color: SCOPE_COLORS[activity.scope] }}>
              {formatNumber(activity.totalEmissions)}
            </p>
            <p className="text-sm text-gray-500">tCO2e</p>
          </div>
        </div>

        {activity.comments && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            <strong>Note:</strong> {activity.comments}
          </div>
        )}
      </div>

      {/* Percentage Breakdown - IMPORTANT FOR INTERVIEWS */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Contribution to Inventory</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold" style={{ color: SCOPE_COLORS[activity.scope] }}>
              {activity.percentOfCategory.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">of Category</p>
            <p className="text-xs text-gray-400 capitalize mt-1">{activity.category}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold" style={{ color: SCOPE_COLORS[activity.scope] }}>
              {activity.percentOfScope.toFixed(2)}%
            </p>
            <p className="text-sm text-gray-500">of Scope {activity.scope}</p>
            <p className="text-xs text-gray-400 mt-1">{formatNumber(scope?.totalEmissions || 0)} tCO2e</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">
              {activity.percentOfTotal.toFixed(3)}%
            </p>
            <p className="text-sm text-gray-500">of Total Inventory</p>
            <p className="text-xs text-gray-400 mt-1">{formatNumber(data.totalEmissions)} tCO2e</p>
          </div>
        </div>
      </div>

      {/* Activity Data - KEY INFO */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Activity Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Value</p>
            <p className="text-2xl font-bold text-gray-800">
              {typeof activity.activityDataValue === 'number'
                ? activity.activityDataValue.toLocaleString()
                : activity.activityDataValue}
            </p>
            <p className="text-lg text-gray-600">{activity.activityDataUnit}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-800 mb-1">Data Source (AD Source)</p>
            <p className="text-blue-900">{activity.adSource}</p>
          </div>
        </div>
      </div>

      {/* Emission Factor - KEY INFO */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Emission Factor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Value</p>
            <p className="text-2xl font-bold text-gray-800">{activity.emissionFactor}</p>
            <p className="text-lg text-gray-600">{activity.efUnit}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800 mb-1">EF Source</p>
            <p className="text-green-900">{activity.efSource}</p>
          </div>
        </div>

        {/* Individual EF breakdown */}
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-gray-500 mb-3">EF by Gas (per Activity Data Unit)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-gray-500">CO2</p>
              <p className="font-semibold">{activity.co2EF} kg</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-gray-500">CH4</p>
              <p className="font-semibold">{activity.ch4EF} kg</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-gray-500">N2O</p>
              <p className="font-semibold">{activity.n2oEF} kg</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-gray-500">F-gases</p>
              <p className="font-semibold">{activity.fgasEF || 'N/A'} kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emissions Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Emissions Breakdown</h2>
        <div className="space-y-3">
          {activity.co2Emissions > 0 && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">CO2 Emissions</span>
              <span className="font-semibold">{formatNumber(activity.co2Emissions)} tCO2</span>
            </div>
          )}
          {activity.ch4Emissions > 0 && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">CH4 Emissions</span>
              <span className="font-semibold">{formatNumber(activity.ch4Emissions)} tCO2e</span>
            </div>
          )}
          {activity.n2oEmissions > 0 && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">N2O Emissions</span>
              <span className="font-semibold">{formatNumber(activity.n2oEmissions)} tCO2e</span>
            </div>
          )}
          {activity.fgasEmissions > 0 && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-700">F-gas Emissions</span>
              <span className="font-semibold">{formatNumber(activity.fgasEmissions)} tCO2e</span>
            </div>
          )}
          <div className="flex justify-between items-center p-3 bg-blue-100 rounded font-semibold">
            <span className="text-blue-800">Total</span>
            <span className="text-blue-800">{formatNumber(activity.totalEmissions)} tCO2e</span>
          </div>
        </div>
      </div>

      {/* Quick Reference Card - Compact version for quick glance */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Quick Reference</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Activity</p>
            <p className="font-medium">{activity.activity !== 'N/A' ? activity.activity : activity.description}</p>
          </div>
          <div>
            <p className="text-gray-400">Emissions</p>
            <p className="font-medium">{formatNumber(activity.totalEmissions)} tCO2e</p>
          </div>
          <div>
            <p className="text-gray-400">Activity Data</p>
            <p className="font-medium">{typeof activity.activityDataValue === 'number' ? activity.activityDataValue.toLocaleString() : activity.activityDataValue} {activity.activityDataUnit}</p>
          </div>
          <div>
            <p className="text-gray-400">Emission Factor</p>
            <p className="font-medium">{activity.emissionFactor} {activity.efUnit}</p>
          </div>
          <div>
            <p className="text-gray-400">AD Source</p>
            <p className="font-medium">{activity.adSource}</p>
          </div>
          <div>
            <p className="text-gray-400">EF Source</p>
            <p className="font-medium">{activity.efSource}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

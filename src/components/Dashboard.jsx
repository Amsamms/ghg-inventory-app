import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import data from '../data/activities.json'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B']

const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toFixed(2)
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const chartData = data.scopes.map((scope, idx) => ({
    name: scope.name,
    value: scope.totalEmissions,
    percent: scope.percentOfTotal
  }))

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">MIDOR GHG Inventory</h1>
        <p className="text-gray-600">Interview Quick Reference Tool</p>

        {/* Search */}
        <form onSubmit={handleSearch} className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Total Emissions */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-6 mb-6 text-white">
        <h2 className="text-lg opacity-80">Total GHG Inventory</h2>
        <p className="text-4xl font-bold">{formatNumber(data.totalEmissions)} tCO2e</p>
        <p className="text-sm opacity-70 mt-1">{data.activities.length} activities across 3 scopes</p>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Emissions by Scope</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${percent.toFixed(1)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${formatNumber(value)} tCO2e`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scope Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.scopes.map((scope, idx) => (
          <Link
            key={scope.id}
            to={`/scope/${scope.id}`}
            className="block"
          >
            <div
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer border-l-4"
              style={{ borderLeftColor: COLORS[idx] }}
            >
              <h3 className="text-xl font-bold text-gray-800">{scope.name}</h3>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS[idx] }}>
                {scope.percentOfTotal.toFixed(1)}%
              </p>
              <p className="text-gray-600 text-sm">{formatNumber(scope.totalEmissions)} tCO2e</p>
              <p className="text-gray-400 text-xs mt-2">
                {scope.categories.length} categories
              </p>
              <div className="mt-3 text-sm text-blue-600 hover:text-blue-800">
                View details →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-50 rounded">
            <span className="font-medium">Largest Source:</span> Scope 3 - Use of Sold Products (84.7%)
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <span className="font-medium">Scope 1 Dominant:</span> Stationary Combustion (92.7% of Scope 1)
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <span className="font-medium">Total Activities:</span> 50 emission sources tracked
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <span className="font-medium">Data Sources:</span> Meters, Invoices, Mass Balance
          </div>
        </div>
      </div>
    </div>
  )
}

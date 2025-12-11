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

  const basePath = import.meta.env.BASE_URL || '/'

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

  const handleDownloadExcel = () => {
    const link = document.createElement('a')
    link.href = `${basePath}data/MIDOR_activities_final_complete.xlsx`
    link.download = 'MIDOR_activities_final_complete.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadPDF = () => {
    const link = document.createElement('a')
    link.href = `${basePath}reports/MIDOR Refinery GHG Inventory 2024 group 5.pdf`
    link.download = 'MIDOR Refinery GHG Inventory 2024 group 5.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadWord = () => {
    const link = document.createElement('a')
    link.href = `${basePath}reports/MIDOR Refinery GHG Inventory 2024 word version.docx`
    link.download = 'MIDOR Refinery GHG Inventory 2024 word version.docx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Back to Home */}
      <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block">
        ← Back to Home
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">MIDOR GHG Inventory</h1>
            <p className="text-gray-600">Interview Quick Reference Tool</p>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Excel Download */}
            <button
              onClick={handleDownloadExcel}
              className="flex items-center gap-3 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:shadow-lg group"
            >
              <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.5 17.5l-2-2.5 2-2.5h1.5l-2 2.5 2 2.5H9.5zm3.5 0L11.5 15l1.5-2.5h1.5L13 15l1.5 2.5H13zm2-11V3.5L18.5 8H15z"/>
              </svg>
              <div className="text-left">
                <div className="font-semibold text-sm">Download Excel</div>
                <div className="text-xs opacity-80">Full calculations & data</div>
              </div>
              <svg className="w-5 h-5 ml-auto opacity-60 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>

            {/* PDF Download */}
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-3 px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:shadow-lg group"
            >
              <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM10.5 17H9v-4h1.5c1.1 0 2 .9 2 2s-.9 2-2 2zm-.5-1h.5c.55 0 1-.45 1-1s-.45-1-1-1H10v2zm4 1h-1v-4h1c1.65 0 3 1.35 3 3s-1.35 3-3 3v-2zm0-2h.5c.55 0 1-.45 1-1s-.45-1-1-1H14v2zM14 3.5L18.5 8H15V3.5z"/>
              </svg>
              <div className="text-left">
                <div className="font-semibold text-sm">Download PDF</div>
                <div className="text-xs opacity-80">Complete inventory report</div>
              </div>
              <svg className="w-5 h-5 ml-auto opacity-60 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>

            {/* Word Download */}
            <button
              onClick={handleDownloadWord}
              className="flex items-center gap-3 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg group"
            >
              <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM15.5 17h-1l-1-3.5-1 3.5h-1l-1.5-5h1.2l.8 3.5 1-3.5h1l1 3.5.8-3.5h1.2l-1.5 5zM14 8V3.5L18.5 8H14z"/>
              </svg>
              <div className="text-left">
                <div className="font-semibold text-sm">Download Word</div>
                <div className="text-xs opacity-80">Editable report format</div>
              </div>
              <svg className="w-5 h-5 ml-auto opacity-60 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>

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

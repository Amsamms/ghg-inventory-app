import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import UncertaintyReferences from './components/UncertaintyReferences'
import ScopeView from './components/ScopeView'
import CategoryView from './components/CategoryView'
import ActivityDetail from './components/ActivityDetail'
import SearchResults from './components/SearchResults'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/database" element={<Dashboard />} />
          <Route path="/uncertainty" element={<UncertaintyReferences />} />
          <Route path="/scope/:scopeId" element={<ScopeView />} />
          <Route path="/scope/:scopeId/category/:categoryName" element={<CategoryView />} />
          <Route path="/activity/:activityId" element={<ActivityDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

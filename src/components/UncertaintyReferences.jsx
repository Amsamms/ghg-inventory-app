import { useState } from 'react'
import { Link } from 'react-router-dom'

const activitiesImages = [
  { name: 'GHG Protocol', file: 'GHG protocol .png' },
  { name: 'IPCC Volume 2 Chapter 1', file: 'IPCC volume 2 chapter 1.png' },
  { name: 'Coke Burning (NEA Report)', file: 'Coke burning from NEA report.png' },
  { name: 'Electricity in IPCC', file: 'Electricity in IPCC.png' },
  { name: 'IPIECA Uncertainty Guide', file: 'IPIECA Addressing Uncertainty in Oil and Natural Gas Industry GHG Inventories.png' },
  { name: 'IPIECA Flare Flow Meter Calculations', file: 'IPIECA Addressing Uncertainty in Oil and Natural Gas Industry GHG Inventories- Flare flow meter calcs.png' }
]

const emissionFactorImages = [
  { name: 'GHG Protocol', file: 'GHG protocol .png' },
  { name: 'IPCC Natural Gas Emission Factor', file: 'IPCC_V2_ch2_emission_factor_natural_gas.png' },
  { name: 'IPCC CH4 Flare', file: 'IPCC_V2_ch4_ch4_flare.png' }
]

export default function UncertaintyReferences() {
  const [activeTab, setActiveTab] = useState('activities')
  const [selectedImage, setSelectedImage] = useState(null)

  const basePath = import.meta.env.BASE_URL || '/'

  const currentImages = activeTab === 'activities' ? activitiesImages : emissionFactorImages
  const currentFolder = activeTab === 'activities' ? 'activities' : 'emission-factor'

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Uncertainty References</h1>
          <p className="text-gray-600">Reference documents for activity data and emission factor uncertainties</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('activities')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'activities'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Activities ({activitiesImages.length})
              </button>
              <button
                onClick={() => setActiveTab('emission-factor')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'emission-factor'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Emission Factors ({emissionFactorImages.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentImages.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openModal(image)}
            >
              <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={`${basePath}references/${currentFolder}/${encodeURIComponent(image.file)}`}
                  alt={image.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = '<span class="text-gray-400">Image not found</span>'
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 text-sm">{image.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Click to enlarge</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div className="max-w-7xl max-h-full overflow-auto bg-white rounded-lg shadow-2xl">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{selectedImage.name}</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="p-4">
                <img
                  src={`${basePath}references/${currentFolder}/${encodeURIComponent(selectedImage.file)}`}
                  alt={selectedImage.name}
                  className="max-w-full h-auto"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

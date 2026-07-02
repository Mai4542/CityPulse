import { useState } from 'react'
import { MapContainer, TileLayer, Polygon, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { qalyubiaAreas } from '../../data/qalyubiaData'
import MapLegend from './MapLegend'
import AreaInfoCard from './AreaInfoCard'

const QALYUBIA_BOUNDS = [
  [30.05, 30.95],
  [30.65, 31.45],
]

export default function HeatMap() {
  const [selectedArea, setSelectedArea] = useState(null)

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">

      <MapContainer
        center={[30.33, 31.18]}
        zoom={10}
        minZoom={10}
        maxZoom={13}
        maxBounds={QALYUBIA_BOUNDS}
        maxBoundsViscosity={1.0}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {qalyubiaAreas.map((area) => (
          <Polygon
            key={area.id}
            positions={area.coordinates}
            pathOptions={{
              color: area.color,
              fillColor: area.color,
              fillOpacity: area.fillOpacity,
              weight: 2,
            }}
            eventHandlers={{
              click: () => setSelectedArea(area),
            }}
          >
            <Tooltip>{area.name}</Tooltip>
          </Polygon>
        ))}
      </MapContainer>

      <MapLegend />

      {selectedArea && (
        <AreaInfoCard
          area={selectedArea}
          onClose={() => setSelectedArea(null)}
        />
      )}

    </div>
  )
}
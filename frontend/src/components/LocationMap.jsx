import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


export const fetchAddressFromCoords = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
    );
    const data = await res.json();
    return data.display_name || null;
  } catch (error) {
    console.error("فشل جلب اسم العنوان:", error);
    return null;
  }
};


const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 17, { duration: 1.2 });
    }
  }, [lat, lng]);
  return null;
};


const pinIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


const ClickHandler = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const LocationMap = ({ lat, lng, onLocationChange, shouldRecenter }) => {

  const defaultCenter = [30.18, 31.2];
  const center = lat && lng ? [lat, lng] : defaultCenter;

  const handleMarkerDrag = (e) => {
    const { lat: newLat, lng: newLng } = e.target.getLatLng();
    onLocationChange(newLat, newLng);
  };

  return (
    <div className="relative h-56 rounded-t-2xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker
          position={center}
          icon={pinIcon}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerDrag }}
        />
        <ClickHandler onSelect={onLocationChange} />
        {shouldRecenter && <RecenterMap lat={lat} lng={lng} />}
      </MapContainer>
    </div>
  );
};

export default LocationMap;
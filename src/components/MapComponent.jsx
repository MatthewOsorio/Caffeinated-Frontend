import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css/MapComponent.css";

function MapComponent({ lat, lng }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={17}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}></Marker>
    </MapContainer>
  );
}

export default MapComponent;

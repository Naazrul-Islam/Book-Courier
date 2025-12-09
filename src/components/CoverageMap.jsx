import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Optional: fix default marker icon issue in Leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

const CoverageMap = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    // fetch warehouses JSON
    fetch("/mapData.json")
      .then((res) => res.json())
      .then((data) => setWarehouses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={[23.8103, 90.4125]} // Dhaka center
        zoom={6}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {warehouses.map((wh) => (
          <Marker key={wh.id} position={[wh.lat, wh.lng]}>
            <Popup>
              <strong>{wh.name}</strong>
              <br />
              {wh.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;

// src/components/ShopMap.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconWB from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconWB,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ShopMap = () => {
    const [shops, setShops] = useState([]);
    // Kandy, Sri Lanka (Your default center)
    const centerPosition = [7.2906, 80.6337];

    useEffect(() => {
        // Fetch data from your Spring Boot Backend
        axios.get('http://localhost:8080/api/shops/nearby', {
            params: { lat: 7.2906, lng: 80.6337 }
        })
        .then(response => {
            setShops(response.data);
        })
        .catch(error => console.error("Error loading shops:", error));
    }, []);

    return (
        <MapContainer 
            center={centerPosition} 
            zoom={13} 
            style={{ height: "100%", width: "100%", borderRadius: "15px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {shops.map(shop => (
                <Marker key={shop.id} position={[shop.latitude, shop.longitude]}>
                    <Popup>
                        <div style={{ color: "black", textAlign: "center" }}>
                            <strong>{shop.name}</strong><br/>
                            {shop.description}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default ShopMap;
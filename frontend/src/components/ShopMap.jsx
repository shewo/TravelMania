import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import RoutingMachine from "./LeafletRoutingMachine";

// --- Marker Icon Fix ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Helper to Re-center Map ---
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, 13);
        }
    }, [center, map]);
    return null;
}

const ShopMap = () => {
    const [shops, setShops] = useState([]);
    
    // 1. Separate State for "View" vs "Real Location"
    const [mapCenter, setMapCenter] = useState([7.2906, 80.6337]); // Where the map looks
    const [userLocation, setUserLocation] = useState(null);        // Where the user IS 📍
    const [destination, setDestination] = useState(null);          // Where they want to go
    const [searchQuery, setSearchQuery] = useState("");
    
    const navigate = useNavigate();

    // 2. Get Real User Location on Load 🌍
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const realLocation = [latitude, longitude];
                    setUserLocation(realLocation);
                    setMapCenter(realLocation); // Center map on user initially
                },
                (error) => {
                    console.error("Error getting location:", error);
                    // Fallback to Kandy if blocked
                    setUserLocation([7.2906, 80.6337]);
                }
            );
        }
    }, []);

    // Fetch shops based on the current MAP CENTER (so they see shops where they look)
    useEffect(() => {
        axios.get('http://localhost:8080/api/shops/nearby', {
            params: { lat: mapCenter[0], lng: mapCenter[1] }
        })
        .then(response => setShops(response.data))
        .catch(error => console.error("Error loading shops:", error));
    }, [mapCenter]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const newCenter = [parseFloat(lat), parseFloat(lon)];
                setMapCenter(newCenter); 
                // We DON'T change userLocation here, only where the map looks!
            }
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    // 3. Helper to reset view to user
    const handleLocateMe = () => {
        if (userLocation) {
            setMapCenter(userLocation);
        }
    };

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            
            {/* CONTROLS OVERLAY */}
            <div style={{
                position: "absolute", 
                top: "20px", 
                left: "50%", 
                transform: "translateX(-50%)", 
                zIndex: 1000,
                display: "flex",
                gap: "10px",
                alignItems: "center"
            }}>
                <div style={{ background: "rgba(0,0,0,0.8)", padding: "10px", borderRadius: "8px", display: "flex", gap: "10px" }}>
                    <input 
                        type="text" 
                        placeholder="Search location..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: "8px", borderRadius: "4px", border: "none" }}
                    />
                    <button onClick={handleSearch} style={{ padding: "8px 15px", background: "#D4AF37", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                        SEARCH
                    </button>
                </div>

                {/* LOCATE ME BUTTON 📍 */}
                <button 
                    onClick={handleLocateMe}
                    style={{ padding: "12px", background: "white", border: "2px solid #D4AF37", borderRadius: "50%", cursor: "pointer", fontSize: "20px" }}
                    title="Locate Me"
                >
                    🎯
                </button>
            </div>

            <MapContainer 
                center={mapCenter} 
                zoom={13} 
                style={{ height: "100%", width: "100%", borderRadius: "15px" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater center={mapCenter} />

                {/* ROUTING: From User Location -> Destination */}
                {userLocation && destination && (
                    <RoutingMachine 
                        userLocation={userLocation} 
                        destination={destination} 
                    />
                )}
                
                {/* Marker for User's Real Location (Optional visual) */}
                {userLocation && (
                    <Marker position={userLocation}>
                        <Popup>You are here! 🧍</Popup>
                    </Marker>
                )}

                {shops.map(shop => (
                    <Marker key={shop.id} position={[shop.latitude, shop.longitude]}>
                        <Popup>
                            <div style={{ textAlign: "center", color: "black" }}>
                                <h3>{shop.name}</h3>
                                <div style={{ display: "flex", gap: "5px", justifyContent: "center", marginTop: "10px" }}>
                                    
                                    {/* Directions Button */}
                                    <button 
                                        onClick={() => setDestination([shop.latitude, shop.longitude])}
                                        style={{ background: "#4a90e2", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                                    >
                                        🚗 Directions
                                    </button>

                                    <button 
                                        onClick={() => navigate(`/store/${shop.id}`)}
                                        style={{ background: "#D4AF37", color: "black", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                                    >
                                        🏪 Visit
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default ShopMap;
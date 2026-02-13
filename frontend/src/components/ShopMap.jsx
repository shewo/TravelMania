import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import RoutingMachine from "./LeafletRoutingMachine";

// --- CUSTOM TAN-GOLD PIN (SVG) ---
// fill="#2E4B73" inverts to #D1B48C due to CSS filter
const goldPinSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#D1B48C" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3" fill="#1a1a1a" stroke="none"></circle>
  </svg>
`;

const goldIcon = L.divIcon({
  html: goldPinSvg,
  className: 'custom-gold-pin', 
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38]
});

const userIcon = L.divIcon({
  className: 'custom-user-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -15]
});

function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => { if (center) map.setView(center, 13); }, [center, map]);
    return null;
}

const ShopMap = () => {
    const [shops, setShops] = useState([]);
    const [mapCenter, setMapCenter] = useState([7.8731, 80.7718]); 
    const [userLocation, setUserLocation] = useState(null); 
    const [destination, setDestination] = useState(null); 
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    setMapCenter([latitude, longitude]);
                },
                (error) => console.error(error)
            );
        }
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/shops/nearby', {
            params: { lat: mapCenter[0], lng: mapCenter[1] }
        })
        .then(response => { setShops(response.data); })
        .catch(error => { console.error(error); });
    }, [mapCenter]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery) return;
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setMapCenter([parseFloat(lat), parseFloat(lon)]); 
            }
        } catch (error) { console.error(error); }
    };

    const handleLocateMe = () => {
        if (userLocation) setMapCenter(userLocation);
        else alert("Location access denied.");
    };

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <div className="search-overlay">
                <input 
                    type="text" 
                    placeholder="Search location..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                />
                <button onClick={handleSearch} className="search-btn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
                <div className="search-divider"></div>
                <button onClick={handleLocateMe} className="locate-btn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><crosshair cx="12" cy="12" r="10"></crosshair><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg></button>
            </div>

            <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%", borderRadius: "20px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapUpdater center={mapCenter} />
                
                {userLocation && destination && <RoutingMachine userLocation={userLocation} destination={destination} />}
                
                {userLocation && (
                    <Marker position={userLocation} icon={userIcon}>
                        <Popup>
                            <div className="custom-popup">
                                <div className="popup-title" style={{color:'#00f2ff', borderBottom:'1px solid rgba(0,242,255,0.3)'}}>
                                    You Are Here
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {shops.map(shop => (
                    <Marker key={shop.id} position={[shop.latitude, shop.longitude]} icon={goldIcon}>
                        <Popup>
                            <div className="custom-popup">
                                <div className="popup-title">{shop.name}</div>
                                <div className="popup-btn-row">
                                    <button onClick={() => setDestination([shop.latitude, shop.longitude])} className="popup-btn-go">🚗 Go</button>
                                    <button onClick={() => navigate(`/store/${shop.id}`)} className="popup-btn-visit">Visit</button>
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
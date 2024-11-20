//Map

import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.css';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

//возможный URL для <TileLayer> с др цветовой гаммой
//https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png

export default function Map ()
{
  const [mapPosition, setMapPosition] = useState([40, 0]);
  //определение в <CitiesContext>
  const { cities } = useCities();

  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  console.log('map');

  return (
    <div className={styles.mapContainer} >

      <MapContainer
        className={styles.map}
        // center={mapPosition}
        center={[mapLat, mapLng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          cities.map(city => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>)
          )
        }
      </MapContainer>
    </div>
  );
}

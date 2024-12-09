//Map

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useURLPosition } from '../hooks/useURLPosition';
import Button from './Button';
import styles from './Map.module.css';

//возможный URL для <TileLayer> с др цветовой гаммой
//https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png

export default function Map ()
{
  const [mapPosition, setMapPosition] = useState([52.6031, 39.5708]);
  //определение в <CitiesContext>
  const { cities } = useCities();
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
  //устанавливается в <CityItem/>
  const [mapLat, mapLng] = useURLPosition();

  useEffect(function ()
  {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(function ()
  {
    if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer} >
      {
        !geolocationPosition &&
        <Button Button type="position" onClick={getPosition}>
          {
            isLoadingPosition ? 'Загрузка...' : 'использовать мое местоположение'
          }
        </Button>
      }
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
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
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div >
  );
}

function ChangeCenter ({ position })
{
  const map = useMap();
  map.setView(position, 6);
  return null;
}

function DetectClick ()
{
  const navigate = useNavigate();

  useMapEvents(
    {
      click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  );
}
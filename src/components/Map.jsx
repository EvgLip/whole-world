//Map

import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

export default function Map ()
{
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  console.log('map');

  return (
    <div className={styles.mapContainer}
      onClick={() => navigate('form')}
    >
      <h2>Position: </h2>
      <h2>{lat}</h2>
      <h2>{lng}</h2>
    </div>
  );
}

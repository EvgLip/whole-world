import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

export default function CityList ()
{
  //определяется в <CitiesContext/>
  const { cities, isLoading } = useCities();

  // console.log('CityList');

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message='Добавьте своe первое место, щелкнув по карте.' />;

  return (
    <ul className={styles.cityList}>
      {cities.map(city => <CityItem city={city} key={city.id} />)}
    </ul>
  );
}


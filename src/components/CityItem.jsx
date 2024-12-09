//CityItem
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat("ru",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

export default function CityItem ({ city })
{
  //определяется в <CitiesContext/>
  const { currentCity, deletePlace } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleDelete (e)
  {
    e.preventDefault();
    deletePlace(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}>

        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={handleDelete}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

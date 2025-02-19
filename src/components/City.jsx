import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";


function City ()
{
  //устанавливается в <CityItem/>
  const { id } = useParams();
  //определяестя в <CitiesContext/>
  const { currentCity, getCurrentCity, isLoading } = useCities();
  const { cityName, emoji, date, notes } = currentCity;

  useEffect(function ()
  {
    getCurrentCity(id);
  }, [id, getCurrentCity]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>Город</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>Когда Вы посещали {cityName}</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Ваши заметки</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Дополнительная информация</h6>
        <a
          href={`https://ru.wikipedia.org/wiki/${cityName}`}

          target="_blank"
          rel="noreferrer"
        >
          {cityName}, узнайте больше в Википедии &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;

///////////////////////////////////
const formatDate = (date) =>
  new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ru } from 'date-fns/locale/ru';

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";
import Message from './Message';
import Spinner from './Spinner';
import { useCities } from "../contexts/CitiesContext";

function convertToEmoji (countryCode)
{
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
registerLocale("ru", ru);

function Form ()
{
  //устанавливаестся в <Map/> в fn DetectClick
  const [lat, lng] = useURLPosition();
  const { createNewPlace, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState('');

  useEffect(function ()
  {
    if (!lat && !lng) return;
    fetchCityData();

    async function fetchCityData ()
    {
      try 
      {
        setIsLoadingGeocoding(true);
        setGeocodingError('');
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) throw new Error('Похоже здесь нет города. Попробуйте указать другое место 🤔');

        setCityName(data.city === data.locality ? `${data.city}` : `${data.city} ${data.locality}`);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      }
      catch (error) 
      {
        setGeocodingError(error.message);
      }
      finally
      {
        setIsLoadingGeocoding(false);
      }
    }
  }, [lat, lng]);

  async function handleSubmit (e)
  {
    e.preventDefault();

    if (!cityName && !date) return;
    if (!lat && !lng) return;

    const newPlace = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createNewPlace(newPlace);
    navigate('/app');
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;
  if (!lat && !lng) return <Message message={'Укажите нужное место на карте 🫠'} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">Город</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Когда Вы посещали {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          showIcon
          locale="ru"
          dateFormat="dd.MM.yyyy"
          selected={date}
          onChange={date => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Заметки о вашей поездке в {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'}>Добавить</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

//CountryList

import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

export default function CountryList ()
{
  const { cities, isLoading } = useCities();

  // console.log('CountryList');

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message='Добавьте своe первое место, щелкнув по карте.' />;

  // const countries = cities.reduce((arr, city) =>
  // {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, []);

  //из списка городов создаем список стран с уникальным названием страны
  const map = new Map(cities.map(city => [city.country, city.emoji]));
  const countries = Array.from(map, ([country, emoji]) => ({ country, emoji }));

  return (
    <ul className={styles.countryList}>
      {countries.map(country => <CountryItem country={country} key={country.country} />)}
    </ul>
  );
}

//CountryList

import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

export default function CountryList ({ cities, isLoading })
{
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message='Add your first city by clicking on the map.' />;

  // const countries = cities.reduce((arr, city) =>
  // {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, []);

  const map = new Map(cities.map(city => [city.country, city.emoji]));
  const countries = Array.from(map, ([country, emoji]) => ({ country, emoji }));

  return (
    <ul className={styles.countryList}>
      {countries.map(country => <CountryItem country={country} key={country.country} />)}
    </ul>
  );
}

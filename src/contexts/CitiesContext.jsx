//CitiesContext

import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

function CitiesProvider ({ children })
{
  //устанавливается в useEffect см здесь ниже
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //устанавливается в fn getCurrentCity см здесь ниже
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function ()
  {
    fetchCities();

    async function fetchCities ()
    {
      try 
      {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      }
      catch (error) 
      {
        alert(error.message);
      }
      finally
      {
        setIsLoading(false);
      }
    }
  }, []);

  //вызывается в <City/>
  async function getCurrentCity (id)
  {
    try 
    {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    }
    catch (error) 
    {
      alert(`(Сообщение из CitiesContext.getCurrentCity()) ${error.message}`);
    }
    finally
    {
      setIsLoading(false);
    }
  }

  //вызывается в <Form/>
  //добавляет в БД новое место
  async function createNewPlace (newPlace)
  {
    try 
    {
      setIsLoading(true);
      const res = await fetch(
        `${BASE_URL}/cities`,
        {
          method: "POST",
          body: JSON.stringify(newPlace),
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await res.json();
      //временный костыль для обновления информации в
      setCities(cities => [...cities, data]);
    }
    catch (error) 
    {
      alert(`(Сообщение из CitiesContext.getCurrentCity()) ${error.message}`);
    }
    finally
    {
      setIsLoading(false);
    }
  }

  // console.log('CitiesContext');

  return (
    <CitiesContext.Provider
      value={
        {
          cities,
          setCities,
          isLoading,
          currentCity,
          getCurrentCity,
          createNewPlace,
        }
      }
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities ()
{
  const context = useContext(CitiesContext);
  if (!context) throw Error('useCities() должен быть вложен в <CitiesProvider>');

  return context;
}

export { CitiesProvider, useCities };
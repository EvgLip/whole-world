//CitiesContext

import { createContext, useEffect, useContext, useReducer, useCallback } from "react";

export { CitiesProvider, useCities };

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function CitiesProvider ({ children })
{
  // const [currentCity, setCurrentCity] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(function ()
  {
    fetchCities();

    async function fetchCities ()
    {
      dispatch({ type: 'loading' });
      try 
      {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      }
      catch (error) 
      {
        dispatch(
          {
            type: 'rejected',
            payload: `(Сообщение из CitiesContext.useEffect.fetchCities()). (${error.message})`
          });
      }
    }
  }, []);

  //вызывается в <City/>
  const getCurrentCity = useCallback(
    async function getCurrentCity (id)
    {
      if (currentCity.id === id) return;

      dispatch({ type: 'loading' });
      try 
      {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      }
      catch (error) 
      {
        dispatch(
          {
            type: 'rejected',
            payload: `(Сообщение из CitiesContext.getCurrentCity()). (${error.message})`
          });
      }
    }, [currentCity.id]);

  //вызывается в <Form/>
  //добавляет в БД новое место
  async function createNewPlace (newPlace)
  {
    dispatch({ type: 'loading' });
    try 
    {
      const res = await fetch(
        `${BASE_URL}/cities`,
        {
          method: "POST",
          body: JSON.stringify(newPlace),
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await res.json();
      //временный костыль для обновления информации в списке городов
      dispatch({ type: 'city/created', payload: data });
    }
    catch (error) 
    {
      dispatch(
        {
          type: 'rejected',
          payload: `(Сообщение из CitiesContext.createNewPlace()). (${error.message})`
        });
    }
  }

  //вызывается в <CityItem/>
  //удаляет запись из БД
  async function deletePlace (id)
  {
    dispatch({ type: 'loading' });
    try 
    {
      await fetch(
        `${BASE_URL}/cities/${id}`,
        {
          method: "DELETE"
        }
      );
      //временный костыль для обновления информации в списке городов
      dispatch({ type: 'city/deleted', payload: id });
    }
    catch (error) 
    {
      dispatch(
        {
          type: 'rejected',
          payload: `(Сообщение из CitiesContext.deletePlace()). (${error.message})`
        });
    }
  }

  return (
    <CitiesContext.Provider
      value={
        {
          cities,
          isLoading,
          currentCity,
          error,
          getCurrentCity,
          createNewPlace,
          deletePlace,
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

function reducer (state, active)
{
  switch (active.type)
  {
    case 'loading':
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case 'cities/loaded': //здесь в CitiesProvider.useEffect.fetchCities
      return {
        ...state,
        isLoading: false,
        cities: active.payload,
        error: '',
      };
    case 'city/loaded': //здесь в CitiesProvider.getCurrentCity
      return {
        ...state,
        isLoading: false,
        currentCity: active.payload,
        error: '',
      };
    case 'city/created': //здесь в CitiesProvider.createNewPlace
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, active.payload],
        currentCity: active.payload,
        error: '',
      };
    case 'city/deleted': //здесь в CitiesProvider.deletePlace
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== active.payload),
        currentCity: {},
        error: '',
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: active.payload,
      };
    default: throw new Error('Неизвестное действие в CitiesContext.reducer()');
  }
}
// FakeAuthContext

import { createContext, useContext, useReducer } from "react";

export { AuthContextProvider, useAuth };

const AuthContext = createContext();

//предварительная заливка для целей разработки
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/150?img=68",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

function AuthContextProvider ({ children })
{
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  function login (email, password)
  {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  }

  function logout ()
  {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider
      value={
        {
          user,
          isAuthenticated,
          login,
          logout,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth ()
{
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth() должен быть вложен в <AuthContextProvider> ');
  return context;
}

function reducer (state, active)
{

  switch (active.type)
  {
    case 'login':
      return {
        ...state,
        user: active.payload,
        isAuthenticated: true,
      };
    case 'logout':
      return {
        ...initialState,
      };
    default: throw new Error('Неизвестное действие в FikeAuthContext.reducer()');
  }
}
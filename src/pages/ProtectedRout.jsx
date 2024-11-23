//ProtectedRout

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

export default function ProtectedRout ({ children })
{
  const navegate = useNavigate();
  const { isAuthenticated } = useAuth();

  console.log('ProtectedRout');

  useEffect(function ()
  {
    console.log('ProtectedRout useEffect');
    if (!isAuthenticated) navegate('/');
  }, [isAuthenticated, navegate]);


  return (
    <>
      {isAuthenticated ? children : null}
    </>
  );
}

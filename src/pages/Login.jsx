import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import Button from "../components/Button";
import styles from "./Login.module.css";

export default function Login ()
{
  const navegate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  // ПРЕДВАРИТЕЛЬНАЯ ЗАЛИВКА ДЛЯ ЦЕЛЕЙ РАЗРАБОТКИ
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  useEffect(function ()
  {
    if (isAuthenticated) navegate('/app', { replace: true });
  }, [isAuthenticated, navegate]);

  function handleSubmit (e)
  {
    e.preventDefault();
    if (!email && !password) return;
    login(email, password);
  }

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Войти</Button>
        </div>
      </form>
    </main>
  );
}

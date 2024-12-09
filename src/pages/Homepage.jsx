import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage ()
{
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          Вы путешествуете по миру.
          <br />
          {'"ВесьМир" поможет следить за вашими приключениями.'}
        </h1>
        <h2>
          Перед Вами откроется карта мира, где Вы найдете все города, которые смогли посетить.
          Никогда не забывайте о своих замечательных впечатлениях и покажите своим друзьям, как
          вы путешествовали по миру.
        </h2>
        <Link to="login" className="cta">
          {'Начни вспоминать "ВесьМир"'}
        </Link>
      </section>
    </main>
  );
}
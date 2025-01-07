// Uses the same styles as Product
import styles from "./Product.module.css";

export default function Product ()
{
  return (
    <main className={styles.product}>
      <section>
        <div>
          <h2>
            Всего 1000 &#x20bd; за бессрочное пользование.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src="img-2.jpg" alt="обзор большого города с небоскребами" />
      </section>
    </main>
  );
}

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import styles from './Home.module.css';

import './styles/global.css';

function Home() {
  return (
    <div>
      <Header />
      <Main>
        <article className={styles.post}>
          <div className={styles.content}>
            <p>Fala galeraa 👋</p>
            <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
            <p>👉{' '}<a href="">jane.design/doctorcare</a></p>
            <p>
              <a href="">#novoprojeto</a>{' '}
              <a href="">#nlw</a>{' '}
              <a href="">#rocketseat</a>
            </p>
          </div>
        </article>
      </Main>
      <Footer />
    </div>
  );
}

export default Home;

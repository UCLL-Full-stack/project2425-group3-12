import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Game Clubs</title>
        <meta name="description" content="Game Club app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/images/gameclublogo.png"
            alt="Game Club Logo"
            // className={styles.vercelLogo}
            width={100}
            height={100}
          />
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
          Calling all game enthusiasts! Dive into a world of endless
          fun and connection with our Game Club Management app.
          </p>
          <p>
          Whether you're a board game buff, a video game virtuoso,
          or a role-playing legend, this app is your gateway to an
          exciting community of like-minded players.
          </p>
          <p>
          Discover and join clubs that match your interests, create
          your own gaming events, and connect with fellow gamers
          who share your passion.
          </p>
          <p>
          From classic chess to cutting-edge VR experiences, weekly
          D&D campaigns to city-wide laser tag showdowns, the
          possibilities are as limitless as your imagination.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
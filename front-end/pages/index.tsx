import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import { useTranslation } from "next-i18next";
import styles from '@styles/home.module.css';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: React.FC = () => {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
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
          <h1>{t('home.title')}</h1>
        </span>

        <div className={styles.description}>
          <p>
          {t('home.description1')}
          </p>
          <p>
          {t('home.description2')}
          </p>
          <p>
          {t('home.description3')}
          </p>
          <p>
          {t('home.description4')}
          </p>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: {locale: any}) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      }
  };
};

export default Home;
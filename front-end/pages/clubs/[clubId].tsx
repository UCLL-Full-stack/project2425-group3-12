import ClubDetails from "@components/clubs/ClubDetails";
import Header from "@components/header";
import ClubService from "@services/ClubService";
import { Club } from "@types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ReadClubById = () => {
  const [club, setClub] = useState<Club | null>(null);

  const router = useRouter();
  const { clubId } = router.query;

  const getClubById = async () => {
    const response = await ClubService.getClubById(clubId as string);
    const club = await response.json();
    setClub(club);
  };

  useEffect(() => {
    if (clubId) {
      getClubById();
    }
  }, [clubId]);

  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('clubs.table.title')}</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>{t('clubs.table.info')}{club && club.name}</h1>
        {!clubId && <p>{t('clubs.table.loading')}</p>}
        <section>
          <ClubDetails club={club} />
        </section>
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

export default ReadClubById;
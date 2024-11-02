import ClubDetails from "@components/clubs/ClubDetails";
import Header from "@components/header";
import ClubService from "@services/ClubService";
import { Club } from "@types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  return (
    <>
      <Head>
        <title>Game Club info</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Info of {club && club.name}</h1>
        {!clubId && <p>Loading</p>}
        <section>
          <ClubDetails club={club} />
        </section>
      </main>
    </>
  );
};

export default ReadClubById;
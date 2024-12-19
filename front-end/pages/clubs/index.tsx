import Head from 'next/head';
import Header from '@components/header';
import { useEffect, useState } from 'react';
import {AuthenticationResponse, Club} from '@types';
import ClubService from '@services/ClubService';
import ClubOverviewTable from '@components/clubs/ClubOverviewTable';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ClubDetails from '@components/clubs/ClubDetails';

const Clubs: React.FC = () => {
    const [clubs, setClubs] = useState<Array<Club>>([]);
    const [error, setError] = useState<string>();
    const [selectedClub, setSelectedClub] = useState<Club | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<AuthenticationResponse| null>(null);
    const {t} = useTranslation();

    const getClubs = async () => {
        setError("");
        const storedUser = localStorage.getItem("loggedInUser");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
        setLoggedInUser(loggedInUser);
        const response = await ClubService.getAllClubs();
        if(!response.ok) {
            if(response.status === 401) {
                setError("You are not authorized to view this page. Please login first.");
            } else {
                setError(response.statusText);
            }
        } else {
            const clubs = await response.json();
            setClubs(clubs);
        }
    }

    useEffect(() => {
        getClubs();
    }, [] );

    const handleLogout = () => {
        setClubs([]);
        setSelectedClub(null);
        setLoggedInUser(null);
        getClubs();
    };

    return (
        <>
            <Head>
                <title>{t('clubs.title')}</title>
            </Head>
            <Header onLogout={handleLogout}/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>
                    {t('clubs.title')}{' '}
                    {loggedInUser && (
                        loggedInUser.role === 'admin'
                            ? ': all (admin)'
                            : `for ${loggedInUser.fullname || ''}`
                    )}
                </h1>
                {error && <div className="text-red-800">{error}</div>}
                {clubs && (
                    <section>
                        <ClubOverviewTable clubs = {clubs} selectClub={setSelectedClub}/>
                    </section>
                )}
                {selectedClub && (
                    <section>
                        <>
                            <h2>{selectedClub && selectedClub.name}</h2>
                            {!selectedClub}
                            <ClubDetails club={selectedClub}/>
                        </>
                    </section>
                )} 
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
    }
}

export default Clubs;
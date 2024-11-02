import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import { Club } from '@types';
import ClubService from '@services/ClubService';
import ClubOverviewTable from '@components/clubs/ClubOverviewTable';

const Clubs: React.FC = () => {

    const [clubs, setClubs] = useState<Array<Club>>([]);
    
    const getClubs = async () => {
        const response = await ClubService.getAllClubs();
        const clubs = await response.json();
        setClubs(clubs);
    }

    useEffect(() => {
        getClubs();
    }, [] )

    return (
        <>
            <Head>
                <title>Game Clubs</title>
            </Head>
            <Header/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Game Clubs</h1>
                <section>
                    <h2>Game clubs overview</h2>
                    {clubs && (
                        <ClubOverviewTable
                            clubs = {clubs}
                        />
                    )
                    }
                </section>
            </main>
        </>
     );
};
export default Clubs;
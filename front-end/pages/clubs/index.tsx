import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import { Club } from '@types';
import ClubService from '@services/ClubService';
import ClubOverviewTable from '@components/clubs/ClubOverviewTable';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Clubs: React.FC = () => {

    const [clubs, setClubs] = useState<Array<Club>>([]);


    const [error, setError] = useState<string>();
    
    const getClubs = async () => {
        setError("");

        const response = await ClubService.getAllClubs();

        if (!response.ok) {
            if (response.status === 401) {
                setError(`${t('clubs.table.error')}`)
            } else {
                setError(response.statusText);
            }
        } else {
            const clubs = await response.json();
            setClubs(clubs);
        }

        // const clubs = await response.json();
        // setClubs(clubs);
    }

    useEffect(() => {
        getClubs();
    }, [] )

    const {t} = useTranslation();

    return (
        <>
            <Head>
                <title>{t('clubs.title')}</title>
            </Head>
            <Header/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>{t('clubs.title')}</h1>
                <section>
                    <h2>{t('clubs.table.headtitle')}</h2>
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

export const getServerSideProps = async (context: {locale: any}) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        }
    }
}

export default Clubs;
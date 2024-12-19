import Head from 'next/head';
import Header from '@components/header';
import CreateEventForm from '@components/clubs/CreateEventForm';
import { useEffect, useState } from 'react';
import { AuthenticationResponse } from '@types';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CreateEventPage: React.FC = () => {
    const [error, setError] = useState<string>();
    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
        // setLoggedInUser(loggedInUser);

        // if (!loggedInUser) {
        //     setError(t("events.create.unauthorized"));
        // }
    }, [t]);

    // const handleLogout = () => {
    //     setLoggedInUser(null);
    //     localStorage.removeItem("loggedInUser");
    // };

    return (
        <>
            <Head>
                <title>{t("events.create.title")}</title>
            </Head>
            <Header/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>{t("events.create.title")}</h1>
                <CreateEventForm />
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        }
    };
};

export default CreateEventPage;

import Head from 'next/head';
import Header from '@components/header';
import { useEffect, useState } from 'react';
import { Event } from '@types';
import EventService from '@services/EventService';
import EventOverviewTable from '@components/events/EventOverviewTable';
import SignupOverviewTable from '@components/signups/SignupOverviewTable';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Events: React.FC = () => {
    const [events, setEvents] = useState<Array<Event>>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const [error, setError] = useState<string>(); // new for unauthorized

    const getEvents = async () => {
        setError("");           // new for unauthorized
        
        const response = await EventService.getAllEvents();         // was already here

        if (!response.ok) {
            if (response.status === 401) {
                setError(`${t('clubs.table.error')}`)
            } else {
                setError(response.statusText);
            }
        } else {
            const events = await response.json();
            setEvents(events);
        }

        // const events = await response.json();            // was already here
        //     setEvents(events);                           // was already here
    }

    useEffect(() => {
        getEvents();
    }, [] )

    const {t} = useTranslation();

    return (
        <>
            <Head>
                <title>{t('events.title')}</title>
            </Head>
            <Header/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>{t('events.title')}</h1>
                <section>
                    <h2>{t('events.table.headtitle')}</h2>
                    {events && (<EventOverviewTable events = {events} selectEvent={setSelectedEvent} />)}
                </section>
                <section>
                    {selectedEvent && (
                        <>
                        <h2>{t('events.table.signup')}{selectedEvent.title}</h2>
                        <SignupOverviewTable event={selectedEvent} />
                        </>
                        )}
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

export default Events;
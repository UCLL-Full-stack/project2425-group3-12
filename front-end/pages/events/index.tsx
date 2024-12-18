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

    const getEvents = async () => {
        const response = await EventService.getAllEvents();
        const events = await response.json();
        setEvents(events);
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
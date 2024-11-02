import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import { Event } from '@types';
import EventService from '@services/EventService';
import EventOverviewTable from '@components/events/EventOverviewTable';

const Events: React.FC = () => {

    const [events, setEvents] = useState<Array<Event>>([]);
    
    const getEvents = async () => {
        const response = await EventService.getAllEvents();
        const events = await response.json();
        setEvents(events);
    }

    useEffect(() => {
        getEvents();
    }, [] )

    return (
        <>
            <Head>
                <title>Game Events</title>
            </Head>
            <Header/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Game Events</h1>
                <section>
                    <h2>Game events overview</h2>
                    {events && (
                        <EventOverviewTable
                            events = {events}
                        />
                    )
                    }
                </section>
            </main>
        </>
     );
};
export default Events;
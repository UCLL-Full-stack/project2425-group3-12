import Head from 'next/head';
import Header from '@components/header';
import { useEffect, useState } from 'react';
import { Event } from '@types';
import EventService from '@services/EventService';
import EventOverviewTable from '@components/events/EventOverviewTable';
import SignupOverviewTable from '@components/signups/SignupOverviewTable';

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
                    {events && (<EventOverviewTable events = {events} selectEvent={setSelectedEvent} />)}
                </section>
                <section>
                    {selectedEvent && (
                        <>
                        <h2>Participant sign-up for {selectedEvent.title}</h2>
                        <SignupOverviewTable event={selectedEvent} />
                        </>
                        )}
                </section>
            </main>
        </>
     );
};
export default Events;
import Head from 'next/head';
import Header from '@components/header';
import { useEffect, useState } from 'react';
import {AuthenticationResponse, Event} from '@types';
import EventService from '@services/EventService';
import EventOverviewTable from '@components/events/EventOverviewTable';
import SignupOverviewTable from '@components/signups/SignupOverviewTable';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Events: React.FC = () => {
    const [events, setEvents] = useState<Array<Event>>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [error, setError] = useState<string>();
    const [loggedInUser, setLoggedInUser] = useState<AuthenticationResponse | null>(null);
    const {t} = useTranslation();

    const getEvents = async () => {
        setError("");
        const storedUser = localStorage.getItem("loggedInUser");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
        setLoggedInUser(loggedInUser);
        const response = await EventService.getAllEvents();
        if(!response.ok) {
            if(response.status === 401) {
                setError("You are not authorized to view this page. Please login first.");
            } else {
                setError(response.statusText);
            }
        } else {
            const events = await response.json();
            setEvents(events);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const handleLogout = () => {
        setEvents([]);
        setSelectedEvent(null);
        setLoggedInUser(null);
        getEvents();
    };

    const refreshSelectedEvent = async () => {
        if (selectedEvent) {
            const response = await EventService.getEventById(selectedEvent.id); // You'll need to add this method to your EventService
            if (response.ok) {
                const updatedEvent = await response.json();
                setSelectedEvent(updatedEvent);

                // Also update the event in the events list
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event.id === updatedEvent.id ? updatedEvent : event
                    )
                );
            }
        }
    };

    return (
        <>
            <Head>
                <title>{t('events.title')}</title>
            </Head>
            <Header onLogout={handleLogout}/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>
                    {t('events.title')}
                    {loggedInUser && (
                        loggedInUser.role === 'admin'
                            ? ': all (admin)'
                            : ` for ${loggedInUser.fullname || ''}`
                    )}
                </h1>
                {error && <div className="text-red-800">{error}</div>}
                {events && (
                    <section>
                        <EventOverviewTable
                            events={events}
                            selectEvent={setSelectedEvent}
                            onSignupSuccess={refreshSelectedEvent}
                        />
                    </section>
                )}
                {selectedEvent && (
                    <section>
                        <h2>{t('events.table.signup')} {selectedEvent.title}</h2>
                        <SignupOverviewTable event={selectedEvent} />
                    </section>
                )}
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any}) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        }
    };
};

export default Events;
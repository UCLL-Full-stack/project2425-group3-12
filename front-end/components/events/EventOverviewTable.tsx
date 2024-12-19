import React, {useEffect, useState} from 'react';
import {AuthenticationResponse, Event} from '@types';
import { useTranslation } from "next-i18next";

type Props = {
    events: Array<Event>;
    selectEvent: (event: Event) => void;
};


const EventsOverviewtable: React.FC<Props> = ({events, selectEvent}: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<AuthenticationResponse | null>(null);
    const [filteredEvents, setFilteredEvents] = useState<Array<Event>>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
        setLoggedInUser(loggedInUser);

        // Filter events when user or events data changes
        if (loggedInUser) {
            if (loggedInUser.role === 'admin') {
                // Admin sees all events
                setFilteredEvents(events);
            } else if (loggedInUser.role === 'member') {
                // Member sees events where they are a member of the club
                const memberEvents = events?.filter(
                    (event) => event?.club?.members?.some(
                        (member) => member?.user?.username === loggedInUser.username
                    )
                ) || [];
                setFilteredEvents(memberEvents);
            } else {
                // Regular user sees only events they organized
                const userEvents = events?.filter(
                    (event) => event?.club?.organiser?.user?.username === loggedInUser.username
                ) || [];
                setFilteredEvents(userEvents);
            }
        }
    }, [events]);

    if (!loggedInUser) {
        return null;
    }

    return (
        <>
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope="col">{t('events.table.overview.title')}</th>
                    <th scope="col">{t('events.table.overview.description')}</th>
                    <th scope="col">{t('events.table.overview.location')}</th>
                    <th scope="col">{t('events.table.overview.date')}</th>
                    <th scope="col">{t('events.table.overview.time')}</th>
                    <th scope="col">{t('events.table.overview.club')}</th>
                </tr>
            </thead>
            <tbody>
                {filteredEvents.map((event, index) => (
                    <tr key={index} onClick={() => selectEvent(event)} role="button">
                        <td>{event.title}</td>
                        <td>{event.description}</td>
                        <td>{event.location}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.time}</td>
                        <td>{event.club.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
     );
};

export default EventsOverviewtable;
import React, {useEffect, useState} from 'react';
import {AuthenticationResponse, Event} from '@types';
import { useTranslation } from "next-i18next";
import MemberService from '@services/MemberService';
import EventService from '@services/EventService';

type Props = {
    events: Array<Event>;
    selectEvent: (event: Event) => void;
    onSignupSuccess: () => void;  // Add this prop
};

const EventsOverviewtable: React.FC<Props> = ({
                                                  events,
                                                  selectEvent,
                                                  onSignupSuccess
                                              }: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<AuthenticationResponse | null>(null);
    const [filteredEvents, setFilteredEvents] = useState<Array<Event>>([]);
    const [signupError, setSignupError] = useState<string>("");
    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
        setLoggedInUser(loggedInUser);

        // Filter events when user or events data changes
        if (loggedInUser) {
            if (loggedInUser.role === 'admin' || loggedInUser.role === 'member') {
                setFilteredEvents(events);
            } else {
                const userEvents = events?.filter(
                    (event) => event?.club?.organiser?.user?.username === loggedInUser.username
                ) || [];
                setFilteredEvents(userEvents);
            }
        }
    }, [events]);

    const handleSignupEvent = async (event: Event) => {
        try {
            setSignupError("");

            if (!loggedInUser) return;

            const memberResponse = await MemberService.getMemberByUsername(loggedInUser.username);
            if (!memberResponse.ok) {
                throw new Error('Failed to get member information');
            }
            const memberData = await memberResponse.json();

            const response = await EventService.signupForEvent(event.id, memberData.id);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sign up for event');
            }
            const refreshResponse = await EventService.getAllEvents();
            if (refreshResponse.ok) {
                const updatedEvents = await refreshResponse.json();
                setFilteredEvents(updatedEvents);
            }
            console.log("Signup successful, triggering refresh...");
            onSignupSuccess();

        } catch (error) {
            setSignupError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    if (!loggedInUser) {
        return null;
    }

    return (
        <>
            {signupError && (
                <div className="text-red-800">{signupError}</div>
            )}
            <table className='table table-hover'>
                <thead>
                <tr>
                    <th scope="col">{t('events.table.overview.title')}</th>
                    <th scope="col">{t('events.table.overview.description')}</th>
                    <th scope="col">{t('events.table.overview.location')}</th>
                    <th scope="col">{t('events.table.overview.date')}</th>
                    <th scope="col">{t('events.table.overview.time')}</th>
                    <th scope="col">{t('events.table.overview.club')}</th>
                    <th scope="col">{t('events.table.overview.action')}</th>
                </tr>
                </thead>
                <tbody>
                {filteredEvents.map((event, index) => (
                    <tr key={index}>
                        <td onClick={() => selectEvent(event)} role="button">{event.title}</td>
                        <td onClick={() => selectEvent(event)} role="button">{event.description}</td>
                        <td onClick={() => selectEvent(event)} role="button">{event.location}</td>
                        <td onClick={() => selectEvent(event)} role="button">
                            {new Date(event.date).toLocaleDateString()}
                        </td>
                        <td onClick={() => selectEvent(event)} role="button">{event.time}</td>
                        <td onClick={() => selectEvent(event)} role="button">{event.club.name}</td>
                        <td>
                            {loggedInUser?.role === "member" && (
                                <>
                                    {(() => {
                                        const isSignedUp = event?.participants?.some(
                                            participant => participant?.user?.username === loggedInUser.username
                                        );

                                        return (
                                            <button
                                                onClick={() => handleSignupEvent(event)}
                                                disabled={isSignedUp}
                                                className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                                                    isSignedUp
                                                        ? 'bg-gray-400 text-gray-600'
                                                        : 'text-white bg-blue-700 hover:bg-blue-800'
                                                }`}
                                            >
                                                {isSignedUp ? t("events.table.signedUpButton") : t("events.table.signUpButton")}
                                            </button>
                                        );
                                    })()}
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default EventsOverviewtable;
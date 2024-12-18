import React from 'react';
import { Event } from '@types';
import { useTranslation } from "next-i18next";

type Props = {
    events: Array<Event>;
    selectEvent: (event: Event) => void;
};


const EventsOverviewtable: React.FC<Props> = ({events, selectEvent}: Props) => {
    
    const { t } = useTranslation();

    return (
        <>
            {events &&  (
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
                        {events.map((event, index) => (
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
            )} 
        </>
     );
};

export default EventsOverviewtable;
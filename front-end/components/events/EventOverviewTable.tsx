import React from 'react';
import { Event } from '@types';

type Props = {
    events: Array<Event>;
    selectEvent: (event: Event) => void;
};


const EventsOverviewtable: React.FC<Props> = ({events, selectEvent}: Props) => {
    return (
        <>
            {events &&  (
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Location</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Club</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index} onClick={() => selectEvent(event)} role="button">
                                <td>{event.title}</td>
                                <td>{event.description}</td>
                                <td>{event.location}</td>
                                <td>{event.date.toString()}</td>
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
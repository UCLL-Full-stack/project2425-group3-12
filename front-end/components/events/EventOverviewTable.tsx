import React from 'react';
import { Event } from '@types';
import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';

type Props = {
    events: Array<Event>;
};


const EventsOverviewtable: React.FC<Props> = ({events}: Props) => {
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
                            <th scope="col">Participants</th>
                            <th scope="col">Club</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr>
                                <td>{event.title}</td>
                                <td>{event.description}</td>
                                <td>{event.location}</td>
                                <td>{event.date.toISOString()}</td>
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
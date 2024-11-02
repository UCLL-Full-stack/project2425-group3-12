import React from 'react';
import { Club } from '@types';
import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';

type Props = {
    clubs: Array<Club>;
};


const ClubOverviewtable: React.FC<Props> = ({clubs}: Props) => {
    return (
        <>
            {clubs &&  (
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Members</th>
                            <th scope="col">organiser</th>
                            <th scope="col">Events</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubs.map((club, index) => (
                            <tr>
                                <td>{club.name}</td>
                                <td>{club.description}</td>
                                <td>{club.type}</td>
                                <td>{club.members.map(member => member.user.firstName + " " + member.user.lastName).join(', ')}</td>
                                <td>{club.organiser.user.firstName.toString() + " " + club.organiser.user.lastName.toString()}</td>
                                <td>{club.events.map(event => event.title).join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )} 
        </>
     );
};

export default ClubOverviewtable;
import React, {useEffect, useState} from "react";
import {AuthenticationResponse, Club} from "@types";
import { useTranslation } from "next-i18next";
import Link from "next/link";

type Props = {
    clubs: Array<Club>;
    selectClub: (club: Club) => void;
};

const ClubOverviewtable: React.FC<Props> = ({ clubs, selectClub }: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<AuthenticationResponse | null>(null);
    const [filteredClubs, setFilteredClubs] = useState<Array<Club>>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
        setLoggedInUser(loggedInUser);
        // Filter clubs when user or clubs data changes
        if (loggedInUser && clubs) {
            const userClubs = clubs.filter(
                (club) => club?.organiser?.user.username === loggedInUser.username
            );
            setFilteredClubs(userClubs);
        }
    }, [clubs]);

    if (!loggedInUser) {
        return null;
    }

    return (
        <>
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">{t('clubs.table.overview.name')}</th>
                <th scope="col">{t('clubs.table.overview.description')}</th>
                <th scope="col">{t('clubs.table.overview.type')}</th>
                <th scope="col">{t('clubs.table.overview.organiser')}</th>
                <th scope="col">{t('clubs.table.overview.button')}</th>
            </tr>
            </thead>
            <tbody>
            {filteredClubs.map((club, index) => (
                <tr key={index}
                    onClick={() => selectClub(club)}
                    role="button">
                    <td>{club.name}</td>
                    <td>{club.description}</td>
                    <td>{club.type}</td>
                    <td>
                        {`${club?.organiser?.user?.firstName || ''} ${club?.organiser?.user?.lastName || ''}`}
                    </td>
                    <td>
                        <Link
                            href={`/schedule/create_event/${club.id}`}>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {/* <button className="login-button"> */}
                                {t('clubs.table.overview.button')}
                            </button>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </>
    );
};

export default ClubOverviewtable;

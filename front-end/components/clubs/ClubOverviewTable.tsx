import React, {useEffect, useState} from "react";
import {AuthenticationResponse, Club} from "@types";
import { useTranslation } from "next-i18next";

type Props = {
    clubs: Array<Club>;
};

const ClubOverviewtable: React.FC<Props> = ({ clubs }: Props) => {
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
            </tr>
            </thead>
            <tbody>
            {filteredClubs.map((club, index) => (
                <tr key={index}>
                    <td>{club.name}</td>
                    <td>{club.description}</td>
                    <td>{club.type}</td>
                    <td>
                        {`${club?.organiser?.user?.firstName || ''} ${club?.organiser?.user?.lastName || ''}`}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </>
    );
};

export default ClubOverviewtable;

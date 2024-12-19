import React, {useEffect, useState} from "react";
import {AuthenticationResponse, Club} from "@types";
import MemberService from '@services/MemberService';
import { useTranslation } from "next-i18next";
import ClubService from "@services/ClubService";

type Props = {
    clubs: Array<Club>;
};

const ClubOverviewtable: React.FC<Props> = ({ clubs }: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<AuthenticationResponse | null>(null);
    const [filteredClubs, setFilteredClubs] = useState<Array<Club>>([]);
    const [joinError, setJoinError] = useState<string>("");
    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
        setLoggedInUser(loggedInUser);

        if (loggedInUser) {
            if (loggedInUser.role === 'admin' || loggedInUser.role === 'member') {
                // Admin sees all clubs
                setFilteredClubs(clubs);
            } else {
                // Regular user sees only clubs they organized
                const userClubs = clubs?.filter(
                    (club) => club?.organiser?.user?.username === loggedInUser.username
                ) || [];
                setFilteredClubs(userClubs);
            }
        }
    }, [clubs]);

    if (!loggedInUser) {
        return null;
    }

    const handleJoinClub = async (clubId: number) => {
        try {
            setJoinError("");

            if (!loggedInUser) return;

            // Get the member ID using the logged-in username
            const memberResponse = await MemberService.getMemberByUsername(loggedInUser.username);
            console.log(memberResponse);
            if (!memberResponse.ok) {
                throw new Error('Failed to get member information');
            }
            const memberData = await memberResponse.json();

            // Now make the join request
            const response = await ClubService.joinClub(clubId, memberData.id);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to join club');
            }
            const refreshResponse = await ClubService.getAllClubs();
            if (refreshResponse.ok) {
                const updatedClubs = await refreshResponse.json();
                setFilteredClubs(updatedClubs);
            }
        } catch (error) {
            setJoinError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    return (
        <>
        {joinError && (
            <div className="text-red-800">{joinError}</div>
        )}
        <table className="table">
            <thead>
            <tr>
                <th scope="col">{t('clubs.table.overview.name')}</th>
                <th scope="col">{t('clubs.table.overview.description')}</th>
                <th scope="col">{t('clubs.table.overview.type')}</th>
                <th scope="col">{t('clubs.table.overview.organiser')}</th>
                <th scope="col">{t('clubs.table.overview.action')}</th>
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
                    <td>
                        {loggedInUser?.role === "member" && (
                            <>
                                {(() => {
                                    const isMember = club?.members?.some(
                                        member => member?.user?.username === loggedInUser.username
                                    );

                                    return (
                                        <button
                                            onClick={() => handleJoinClub(club.id)}
                                            disabled={isMember}
                                            className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                                                isMember
                                                    ? 'bg-gray-400 text-gray-600'
                                                    : 'text-white bg-blue-700 hover:bg-blue-800'
                                            }`}
                                        >
                                            {isMember ? t("clubs.table.joinedButton") : t("clubs.table.joinButton")}
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

export default ClubOverviewtable;

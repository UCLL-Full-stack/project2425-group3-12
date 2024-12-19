const getAllClubs = async () => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/clubs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const getClubById = async (clubId: string) => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/clubs/" + clubId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const joinClub = async (clubId: number, memberId: number) => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/clubs/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            club: { id: clubId },
            member: { id: memberId }
        })
    });
};

const ClubService = {
    getAllClubs,
    getClubById,
    joinClub,
};
  
export default ClubService;
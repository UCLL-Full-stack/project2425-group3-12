const getAllClubs = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/clubs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

const getClubById = async (clubId: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/clubs/" + clubId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};
  
const ClubService = {
    getAllClubs,
    getClubById,
};
  
export default ClubService;
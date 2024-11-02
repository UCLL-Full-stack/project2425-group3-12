const getAllClubs = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/clubs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response
};
  
  
const ClubService = {
    getAllClubs,
};
  
export default ClubService;
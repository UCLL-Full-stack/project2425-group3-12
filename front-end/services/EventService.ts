const getAllEvents = async () => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};
  
  
const EventService = {
    getAllEvents,
};
  
export default EventService;
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

const getEventById = async (eventId: number) => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/events/" + eventId, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const signupForEvent = async (eventId: number, memberId: number) => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/events/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            event: { id: eventId },
            member: { id: memberId }
        })
    });
};

const EventService = {
    getAllEvents,
    getEventById,
    signupForEvent,
};
  
export default EventService;
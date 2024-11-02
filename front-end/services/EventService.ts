const getAllEvents = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/events",  {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};
  
  
const EventService = {
    getAllEvents,
};
  
export default EventService;
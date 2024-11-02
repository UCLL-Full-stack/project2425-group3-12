import { fetchExternalImage } from "next/dist/server/image-optimizer";
import Events from "pages/events";

const getAllEvents = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/events");
};
  
  
const EventService = {
    getAllEvents,
};
  
export default EventService;
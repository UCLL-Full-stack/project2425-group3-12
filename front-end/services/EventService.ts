import { fetchExternalImage } from "next/dist/server/image-optimizer";
import Events from "pages/Events";

const getAllEvents = async () => {
    // LecturerService.getAllLecturers()
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/events");
};
  
//   const getLecturerById = async (lecturerId: string) => {
//     return await fetch(process.env.NEXT_PUBLIC_API_URL + `/lecturers/${lecturerId}`);
//   }
  
const EventService = {
getAllEvents,
// getLecturerById
};
  
export default EventService;
import { Event } from "@types";

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

const createNewEvent = async (newEvent: Event) => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
    })
}
  
  
const EventService = {
    getAllEvents,
    createNewEvent
};
  
export default EventService;

function async(Event: { new(type: string, eventInitDict?: EventInit | undefined): globalThis.Event; prototype: globalThis.Event; readonly NONE: 0; readonly CAPTURING_PHASE: 1; readonly AT_TARGET: 2; readonly BUBBLING_PHASE: 3; }, newEvent: any) {
    throw new Error("Function not implemented.");
}

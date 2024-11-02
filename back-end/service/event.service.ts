import { Event } from "../model/event"
import clubDb from "../repository/club.db";
import eventDb from "../repository/event.db"
import { EventInput } from '../types';

const getAllEvents = () : Event[] => { 
    return eventDb.getAllEvents() 
}

const getEventById = (id: number) : Event | null => { 
    const event = eventDb.getEventById({id})
    if (!event) {
        throw new Error(`Event with id ${id} does not exist`)
    }
    return event;
}

const createNewEvent = ({title, description, location, date, time, participants, club: clubInput}: EventInput): Event => {
    if (clubInput.id === undefined) {
        throw new Error('Club id is required.');
    }
    const club = clubDb.getClubById({id: clubInput.id});

    if(!club){
        throw new Error(`Club not found with the given ID`);
    }
    if(!date){
        throw new Error(`Date is required`);
    }
    if(!location){
        throw new Error(`Location is required`);
    }
    if(!title){
        throw new Error(`Title is required`);
    }

    // already existing event for club
    const EventAlreadyExists = eventDb.getEventsByClub({id: clubInput.id});
    if (EventAlreadyExists.length > 0) {
        for (const event of EventAlreadyExists) {
            if (event.getDate() === date && event.getTime() === time && event.getTitle() === title) {
                throw new Error('This event is already scheduled for this club.');
            }
        }
    }

    const event = new Event({title, description, location, date, time, participants, club});
    return eventDb.createNewEvent(event);
}

export default { 
    getAllEvents, 
    getEventById,
    createNewEvent
}
import { Club } from "../model/club";
import { Event } from "../model/event"
import clubDb from "../repository/club.db";
import eventDb from "../repository/event.db"
import { EventInput } from '../types';


// async al gemaakt (story 20)
const getAllEvents = async () : Promise<Event[]> => { 
    return eventDb.getAllEvents() 
}

// async al gemaakt (story 20)
const getEventById = async (id: number) : Promise<Event | null> => { 
    const event = eventDb.getEventById({id})
    if (!event) {
        throw new Error(`Event with id ${id} does not exist`)
    }
    return event;
}

// async al gemaakt (story 20)
const createNewEvent = async ({title, description, location, date, time, participants, club: clubInput}: EventInput): Promise<Event> => {
    if (!clubInput.id) throw new Error('Club id is required.');
    
    const club = await clubDb.getClubById({id: clubInput.id});
    if(!club) throw new Error(`Club not found with the given ID`);
    
    if(!date) throw new Error(`Date is required`);
    if(!location) throw new Error(`Location is required`);
    if(!title) throw new Error(`Title is required`);

    // Convert the date string to a Date object
    const dateObject = new Date(`${date}T00:00:00.000Z`);
    if (dateObject.toString() === 'Invalid Date') {
        throw new Error('Invalid date');
    }

    // Check for already existing event for club
    const existingEvents = await eventDb.getEventsByClub({id: clubInput.id});
    if (existingEvents === null) {
        throw new Error('Failed to fetch events for the club');
    }

    const newEvent = new Event({title, description, location, date: dateObject, time, participants, club});
    
    const duplicateEvent = existingEvents.find(existingEvent => 
        existingEvent.isDuplicateOf(newEvent)
    );

    if (duplicateEvent) {
        throw new Error(`An event at the specified date and time already exists for this club`);
    }

    return eventDb.createNewEvent(newEvent);
}

export default { 
    getAllEvents, 
    getEventById,
    createNewEvent
}
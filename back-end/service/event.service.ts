import { Event } from "../model/event"
import clubDb from "../repository/club.db";
import eventDb from "../repository/event.db"
import {EventInput, MemberInput, Role} from '../types';
import { GameClubError, ValidationError, AuthenticationError, DatabaseError } from "../util/errors";
import memberDb from "../repository/member.db";


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

const addMemberToEvent = async (
    signupInput: {
        event: EventInput;
        member: MemberInput;
    },
    authInput: {
        role: Role;
    }
): Promise<Event | null> => {
    if (!signupInput.event.id) throw new ValidationError('Event id is required.');
    if (!signupInput.member.id) throw new ValidationError('Member id is required.');
    if (authInput.role !== 'member') throw new GameClubError('Only members can signup for events.');

    const event = await eventDb.getEventById({ id: signupInput.event.id });
    if (!event) throw new GameClubError('Event not found');

    const member = await memberDb.getMemberById({ id: signupInput.member.id });
    if (!member) throw new GameClubError('Member not found');

    // Check if member is already signed up
    const isAlreadySignedUp = event.getParticipants().some(
        participant => participant.getId() === member.getId()
    );
    if (isAlreadySignedUp) {
        throw new GameClubError('Member is already signed up for this event');
    }

    event.addParticipantToEvent(member);

    try {
        return await eventDb.updateEventParticipants(event);
    } catch (error) {
        throw new DatabaseError('Failed to update event participants');
    }
}

export default {
    getAllEvents,
    getEventById,
    createNewEvent,
    addMemberToEvent
}
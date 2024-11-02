import { Event } from '../model/event';
import { User } from "../model/user";
import { Member } from "../model/member";
import { Organiser } from "../model/organiser";
import { Club } from "../model/club";

// create 2 organisers
const organiserJohnDoe = new Organiser({
    id: 1,
    user: new User({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@mail.com",
        password: "password",
        role: "organiser"
    })
})
const organiserJaneDoe = new Organiser({
    id: 2,
    user: new User({
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@mail.com",
        password: "password",
        role: "organiser"
    })
})

// create 4 members
const memberAlice = new Member({
    id: 1,
    user: new User({
        id: 5,
        firstName: "Alice",
        lastName: "Doe",
        email: "alice.doe@mail.com",
        password: "password",
        role: "member"
    })
})
const memberBob = new Member({
    id: 2,
    user: new User({
        id: 6,
        firstName: "Bob",
        lastName: "Doe",
        email: "bob.doe@mail.com",
        password: "password",
        role: "member"
    })
})
const memberCharlie = new Member({
    id: 3,
    user: new User({
        id: 7,
        firstName: "Charlie",
        lastName: "Doe",
        email: "charlie.doe@mail.com",
        password: "password",
        role: "member"
    })
})
const memberDavid = new Member({
    id: 4,
    user: new User({
        id: 8,
        firstName: "David",
        lastName: "Doe",
        email: "david.doe@mail.com",
        password: "password",
        role: "member"
    })
})

// create 2 clubs
const club1 = new Club({
    id: 1,
    name: "Checkmate Connoisseurs",
    description: "A chess club for strategy lovers, fostering intense matches and friendly competition among enthusiasts.",
    type: "Chess",
    members: [memberAlice, memberBob],
    organiser: organiserJohnDoe,
    events: []
})
const club2 = new Club({
    id: 2,
    name: "Hawaii Try-O",
    description: "An adventurous rugby club embracing teamwork, skill, and the spirit of aloha in every game.",
    type: "Rugby",
    members: [memberCharlie, memberDavid],
    organiser: organiserJaneDoe,
    events: []
})

const events: Event[] = [
    new Event({
        id: 1,
        title: "Annual Chess Tournament",
        description: "A competitive chess tournament with prizes for the top three participants.",
        location: "Community Hall",
        date: new Date('2024-12-05'),
        time: 1000,
        participants: [memberAlice],
        club: club1
    }),
    new Event({
        id: 2,
        title: "Annual Rugby Championship",
        description: "A competitive rugby match bringing together local teams for the championship title.",
        location: "City Stadium",
        date: new Date('2024-11-07'),
        time: 1400,
        participants: [memberCharlie, memberDavid],
        club: club2
    })
];

const getAllEvents = (): Event[] => {
    return events;
}

const getEventById = ({ id }: { id: number }): Event | null => {
    return events.find(event => event.getId() === id) || null;
}

const createNewEvent = (eventInfo: Event): Event => {  
    const event = new Event({title: eventInfo.getTitle(), description: eventInfo.getDescription(), location: eventInfo.getLocation(), date: eventInfo.getDate(), time: eventInfo.getTime(), participants: eventInfo.getParticipants(), club: eventInfo.getClub()}) 
    events.push(event)
    return event
}

const getEventsByClub = ({id}: {id: number}): Event[] => {
    const eventsWithClub = events.filter(event => event.getClub().getId() === id);
    return eventsWithClub
}

export default {
    getAllEvents,
    getEventById,
    createNewEvent,
    getEventsByClub
};

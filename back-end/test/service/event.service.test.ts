import { set } from 'date-fns';
import { User } from '../../model/user';
import { Member } from '../../model/member';
import { Organiser } from '../../model/organiser';
import { Club } from '../../model/club';
import { Event } from '../../model/event';
import eventDb from '../../repository/event.db';
import clubDb from '../../repository/club.db';
import { ClubInput, EventInput, UserInput, OrganiserInput, MemberInput } from '../../types';
import eventService from '../../service/event.service';

const title = "Annual Chess Tournament";
const description = "A competitive chess tournament with prizes for the top three participants.";
const location = "Community Hall";
const date = new Date('2024-12-05');
const time = 1000;

const userInputOrganiser: UserInput = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@mail.com",
    password: "password",
    role: "organiser"
};

const userOrganiser = new User(userInputOrganiser);

const organiserInput: OrganiserInput = {
    id: 1,
    user: userInputOrganiser
};

const organiser = new Organiser({id: organiserInput.id, user: userOrganiser});

const userInput1: UserInput = {
    id: 2,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    password: "password123", 
    role: "member" 
};

const userInput2: UserInput = {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    password: "securePass456",
    role: "member" 
};

const user1 = new User(userInput1);
const user2 = new User(userInput2);

const member1 : MemberInput ={
    id: 1,
    user: userInput1,
}

const member2 : MemberInput ={
    id: 2,
    user: userInput2,
}

// const createMember = (input: MemberInput): Member => {
//     // Assuming Member constructor takes an object similar to MemberInput
//     return new Member(input.id, input.userInput); // Modify this line according to Member's constructor
// };

const members: Member[] = [
    new Member({id: member1.id, user: user1}),
    new Member({id: member2.id, user: user2})
];


const clubInput: ClubInput = {
    id: 1, 
    name: "Chess Club",
    description: "A club for chess enthusiasts to play and learn together.",
    type: "Chess", 
    members: members,
    organiser: organiserInput,
    events: []
};


const club = new Club({
    id: clubInput.id, name: clubInput.name, description: clubInput.description, type: clubInput.type, members: clubInput.members, organiser: organiser, events: []
});

const event1: Event = new Event({
    id: 1,
    title: "Annual Chess Tournament",
    description: "A competitive chess tournament with prizes for the top three participants.",
    location: "Community Hall",
    date: new Date('2024-12-05'),
    time: 1000,
    participants: [],
    club: club
});



let createNewEventMock: jest.Mock;
let mockEventDbGetEventByClub: jest.Mock;
let mockEventDbCreateNewEvent: jest.SpyInstance<Event, [Event], any>
let mockClubDbGetClubById: jest.SpyInstance<Club | null, [{id: number}], any>



beforeEach(() => {
    createNewEventMock = jest.fn();
    mockEventDbGetEventByClub = jest.fn();

    mockEventDbCreateNewEvent = jest.spyOn(eventDb, 'createNewEvent');
    mockClubDbGetClubById = jest.spyOn(clubDb, 'getClubById')
})

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid event, when event is created, then event is created with those values', () => {
    //given
    mockClubDbGetClubById.mockReturnValue(club);

    //when
    eventService.createNewEvent({title, description, location, date, time, participants: [], club: clubInput});

    //then
    expect(mockEventDbCreateNewEvent).toHaveBeenCalledTimes(1);
    expect(mockEventDbCreateNewEvent).toHaveBeenCalledWith(new Event({title, description, location, date, time, participants: [], club}));
})

test('given an event already scheduled for the club, when creating a new event, then an error is thrown', () => {
    //given
    mockClubDbGetClubById.mockReturnValue(club);
    eventDb.getEventsByClub = mockEventDbGetEventByClub.mockReturnValue(new Event({title, description, location, date, time, participants: [], club}));

    //when
    const createEvent = () => eventService.createNewEvent({title, description, location, date, time, participants: [], club: clubInput});

    //then
    expect(createEvent).toThrow('This event is already scheduled for this club.');
})
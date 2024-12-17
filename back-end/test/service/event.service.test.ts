import { User } from '../../model/user';
import { Member } from '../../model/member';
import { Organiser } from '../../model/organiser';
import { Club } from '../../model/club';
import { Event } from '../../model/event';
import eventDb from '../../repository/event.db';
import clubDb from '../../repository/club.db';
import { ClubInput, UserInput, OrganiserInput, MemberInput } from '../../types';
import eventService from '../../service/event.service';

// Event details
const title = "Annual Chess Tournament";
const description = "A competitive chess tournament with prizes for the top three participants.";
const location = "Community Hall";
const date = new Date("2024-12-05");
const dateString = "2024-12-05";
const time = "10:00";

// Organiser details
const userInputOrganiser: UserInput = {
    id: 1,
    username: "john.doe",
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
const organiser = new Organiser({ id: organiserInput.id, user: userOrganiser });

// Member details
const userInput1: UserInput = {
    id: 2,
    username: "alice.doe",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    password: "password123",
    role: "member"
};
const userInput2: UserInput = {
    id: 3,
    username: "bob.doe",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    password: "securePass456",
    role: "member"
};
const user1 = new User(userInput1);
const user2 = new User(userInput2);
const member1: MemberInput = {
    id: 1,
    user: userInput1
};
const member2: MemberInput = {
    id: 2,
    user: userInput2
};
const members: Member[] = [
    new Member({ id: member1.id, user: user1 }),
    new Member({ id: member2.id, user: user2 })
];

// Club details
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
    id: clubInput.id,
    name: clubInput.name,
    description: clubInput.description,
    type: clubInput.type,
    members: clubInput.members,
    organiser: organiser,
    events: []
});

// Event instance
const event1: Event = new Event({
    id: 1,
    title: title,
    description: description,
    location: location,
    date: date,
    time: time,
    participants: [],
    club: club
});

let createNewEventMock: jest.Mock;
let mockEventDbGetEventByClub: jest.Mock;
let mockEventDbCreateNewEvent: jest.SpyInstance;
let mockClubDbGetClubById: jest.SpyInstance;

beforeEach(() => {
    createNewEventMock = jest.fn();
    mockEventDbGetEventByClub = jest.fn();

    mockEventDbCreateNewEvent = jest.spyOn(eventDb, 'createNewEvent');
    mockClubDbGetClubById = jest.spyOn(clubDb, 'getClubById')
})

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid event, when crating a new event, then event is created with those values', () => {
    //given
    // Event details
    const title2 = "EK Chess";
    const description2 = "European Chess Championship";
    const location2 = "Naamsestraat 15, Leuven";
    const date2 = "2024-12-08";
    const time2 = "14:00";
    
    
    //when
    const newEvent = eventService.createNewEvent({
        title: title2,
        description: description2,
        location: location2,
        date: date2,
        time: time2,
        participants: [],
        club: clubInput
    });

    //then
    expect(mockClubDbGetClubById).toHaveBeenCalledWith({ id: clubInput.id });
    expect(mockEventDbCreateNewEvent).toHaveBeenCalledWith(newEvent);
});

test('given an event already scheduled for the club, when creating a new event, then an error is thrown', () => {
    //given
    //given
    mockClubDbGetClubById.mockReturnValue(club);
    mockEventDbGetEventByClub.mockReturnValue([event1]);

    //when
    const createEvent = () => eventService.createNewEvent({
        title,
        description,
        location,
        date: dateString,
        time,
        participants: [],
        club: clubInput
    });

    //then
    expect(createEvent).toThrow('An event at the specified date and time already exists for this club');
})
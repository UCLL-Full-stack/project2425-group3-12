import { Club } from "../../model/club";
import { Event } from "../../model/event";
import { Organiser } from "../../model/organiser";
import { User } from "../../model/user";

test('given: a valid values, when: creating event, then: event is created with those values', () => {
    //given
    const organiser = new Organiser({
        id: 1,
        user: new User({
            id: 1,
            username: "john.doe",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@mail.com",
            password: "password",
            role: "organiser"
        })
    });

    const club = new Club({
        id: 1,
        name: "Chess Club",
        description: "A club for chess enthusiasts",
        type: "Chess",
        members: [],
        organiser: organiser,
        events: []
    });

    const eventInput = {
        id: 1,
        title: "Chess Tournament",
        description: "A tournament for chess enthusiasts to showcase their skills and compete for the title of champion.",
        location: "Chess Club",
        date: new Date("2022-12-31T23:59:59"),
        time: "14:00",
        participants: [],
        club: club
    };

    //when
    const event = new Event(eventInput);

    //then
    expect(event.getId()).toBe(eventInput.id);
    expect(event.getTitle()).toBe(eventInput.title);
    expect(event.getDescription()).toBe(eventInput.description);
    expect(event.getLocation()).toBe(eventInput.location);
    expect(event.getDate()).toEqual(eventInput.date);
    expect(event.getTime()).toBe(eventInput.time);
    expect(event.getParticipants()).toEqual(eventInput.participants);
    expect(event.getClub().getId()).toBe(eventInput.club.getId());
});
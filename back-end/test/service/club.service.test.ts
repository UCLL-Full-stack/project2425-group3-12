import clubService from "../../service/club.service";
import clubDb from "../../repository/club.db";
import { Club } from "../../model/club";
import { Organiser } from "../../model/organiser";
import { User } from "../../model/user";
import { Member } from "../../model/member";

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
const club = new Club({
    id: 1,
    name: "Checkmate Connoisseurs",
    description: "A chess club for strategy lovers, fostering intense matches and friendly competition among enthusiasts.",
    type: "Chess",
    members: [memberAlice, memberBob],
    organiser: organiserJohnDoe,
    events: []
});

test('given: a valid id for a club, when: getting club by id, then: club is returned', () => {
    //given
    const clubInput = {
        id: 1,
    };
    
    //when
    const club = clubService.getClubById(clubInput.id);

    //then
    expect(club).toBe(club);
});
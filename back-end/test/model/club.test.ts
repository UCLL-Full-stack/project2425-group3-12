import { Club } from "../../model/club";
import { Member } from "../../model/member";
import { Organiser } from "../../model/organiser";
import { User } from "../../model/user";

//given
const validUser = new User({
    username: "john.doe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@mail.com",
    password: "password",
    role: "organiser"
});
const validOrganiser = new Organiser({
    user: validUser
});
const jackDoe = new User({
    username: "jack.doe",
    firstName: "Jack",
    lastName: "Doe",
    email: "jack.doe@mail.com",
    password: "password",
    role: "member"
});
const janeDoe = new User({
    username: "jane.doe",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@mail.com",
    password: "password",
    role: "member"
});
const member1 = new Member({
    user: jackDoe
});
const member2 = new Member({
    user: janeDoe
});
const members = [member1, member2];


test('givev: valid values for club, when: creating club, then: club is created', () => {
    // given
    const clubName = "Checkmate Connoisseurs";
    const clubDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const clubType = "Chess";
    //when
    const club = new Club({
        name: clubName,
        description: clubDescription,
        type: clubType,
        members: members,
        organiser: validOrganiser,
        events: []
    });


    //then
    expect(club.getName()).toBe(clubName);
    expect(club.getDescription()).toBe(clubDescription);
    expect(club.getType()).toBe(clubType);
    expect(club.getMembers()).toBe(members);
    expect(club.getOrganiser()).toBe(validOrganiser);
});

test('given valid club, when: adding member to club, then: member is added to club', () => {
    // given
    const clubName = "Hawaii Try-O";
    const clubDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const clubType = "Rugby";
    const club = new Club({
        name: clubName,
        description: clubDescription,
        type: clubType,
        members: members,
        organiser: validOrganiser,
        events: []
    });
    const newMember = new Member({
        user: new User({
            username: "jill.doe",
            firstName: "Jill",
            lastName: "Doe",
            email: "jill.doe@mail.com",
            password: "password",
            role: "member"
        })
    });
    //when
    const member = club.addMemberToClub(newMember);
    
    //then
    expect(club.getMembers()).toContain(member);
});

test('given: valid club, when: comparing clubs, then: clubs are equal', () => {
    // given
    const clubName = "Hawaii Try-O";
    const clubDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const clubType = "Rugby";
    const club = new Club({
        id: 1,
        name: clubName,
        description: clubDescription,
        type: clubType,
        members: members,
        organiser: validOrganiser,
        events: []
    });

    //then
    expect(club.equals(club)).toBeTruthy();
});

test('given: valid club, when: comparing clubs, then: clubs are not equal', () => {
    // given
    const clubName = "Hawaii Try-O West";
    const clubDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const clubType = "Rugby";
    const club = new Club({
        id: 1,
        name: clubName,
        description: clubDescription,
        type: clubType,
        members: members,
        organiser: validOrganiser,
        events: []
    });
    const club2 = new Club({
        id: 2,
        name: "Hawaii Try-O East",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        type: "Rugby",
        members: members,
        organiser: validOrganiser,
        events: []
    });

    //then
    expect(club.equals(club2)).toBeFalsy();
});
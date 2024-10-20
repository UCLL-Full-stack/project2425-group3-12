import { Club } from "../../model/club";
import { Member } from "../../model/member";
import { Organiser } from "../../model/organiser";
import { User } from "../../model/user";

//given
const validUser = new User({
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@mail.com",
    password: "password"
});
const validOrganiser = new Organiser({
    user: validUser
});
const jackDoe = new User({
    firstname: "Jack",
    lastname: "Doe",
    email: "jack.doe@mail.com",
    password: "password"
});
const janeDoe = new User({
    firstname: "Jane",
    lastname: "Doe",
    email: "jane.doe@mail.com",
    password: "password"
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
        organiser: validOrganiser
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
        organiser: validOrganiser
    });
    const newMember = new Member({
        user: new User({
            firstname: "Jill",
            lastname: "Doe",
            email: "jill.doe@mail.com",
            password: "password"
        })
    });
    //when
    const member = club.addMemberToClub(newMember);
    
    //then
    expect(club.getMembers()).toContain(member);
});
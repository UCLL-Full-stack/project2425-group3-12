import { Member } from "../../model/member";
import { User } from "../../model/user";

// given
const validUser = new User({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@mail.com",
    password: "password",
    role: "member"

});

test('given: a valid user, when: creating a member, then: a member is created', () => {
    
    //when
    const member = new Member({
        user: validUser
    });

    //then
    expect(member.getUser()).toBe(validUser);
});
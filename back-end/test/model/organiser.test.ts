import { Organiser } from "../../model/organiser";
import { User } from "../../model/user";

//given
const validUser = new User({
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@mail.com",
    password: "password"
});

test('given: valid user, when: creating organiser, then: organiser is created', () => {
    //when
    const organiser = new Organiser({
        user: validUser
    });

    //then
    expect(organiser.getUser()).toBe(validUser);
});
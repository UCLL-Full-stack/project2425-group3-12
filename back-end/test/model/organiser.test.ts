import { Organiser } from "../../model/organiser";
import { User } from "../../model/user";

//given
const validUser = new User({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@mail.com",
    password: "password",
    role: "organiser"
});

test('given: valid user, when: creating organiser, then: organiser is created', () => {
    //when
    const organiser = new Organiser({
        user: validUser
    });

    //then
    expect(organiser.getUser()).toBe(validUser);
});

test('given: valid organiser, when: getting user, then: user is returned', () => {
    //given
    const organiser = new Organiser({
        id: 1,
        user: validUser
    });

    //when
    const user = organiser.getUser();

    //then
    expect(user).toBe(validUser);
});

test('given: valid organiser, when: getting id, then: id is returned', () => {
    //given
    const organiser = new Organiser({
        id: 1,
        user: validUser
    });

    //when
    const id = organiser.getId();

    //then
    expect(id).toBe(1);
});

test('given: valid organiser, when: comparing organiser, then: organiser is equal', () => {
    //given
    const organiser = new Organiser({
        id: 1,
        user: validUser
    });

    //when
    const isEqual = organiser.equals(organiser);

    //then
    expect(isEqual).toBe(true);
});
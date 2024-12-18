import { User } from "../../model/user";

test('given: valid values, when: creating user, then: user is created', () => {
    //given
    const username = "john.doe";
    const firstName = "John";
    const lastName = "Doe";
    const email = "john.doe@mail.com";
    const password = "password";
    const role = "organiser";

    //when
    const user = new User({
        username,
        firstName,
        lastName,
        email,
        password,
        role
    });

    
    //then
    expect(user.getFirstName()).toBe(firstName);
    expect(user.getLastName()).toBe(lastName);
    expect(user.getEmail()).toBe(email);
    expect(user.getPassword()).toBe(password);
    expect(user.getRole()).toBe(role);
});

test('given: empty string for first name, when: creating user, then: error is thrown', () => {
    //given
    const username = "john.doe";
    const firstName = "";
    const lastName = "Doe";
    const email = "john.doe@mail.com";
    const password = "password";
    const role = "organiser";

    //when
    const createUser = () => new User({
        username,
        firstName,
        lastName,
        email,
        password,
        role
    });

    //then
    expect(createUser).toThrow('First name is required');
});

test('given: null for first name, when: creating user, then: error is thrown', () => {
    //given
    const username = "john.doe";
    const firstName = null as unknown as string; //force null to be a string by using TypeScript's type assertions to bypass the type checks
    const lastName = "Doe";
    const email = "john.doe@mail.com";
    const password = "password";
    const role = "organiser";

    //when
    const createUser = () => new User({
        username,
        firstName,
        lastName,
        email,
        password,
        role
    });

    //then
    expect(createUser).toThrow('First name is required');
});

test('given: undefined for first name, when: creating user, then: error is thrown', () => {
    //given
    const username = "john.doe";
    const firstName = undefined as unknown as string; // force undefined to be a string by using TypeScript's type assertions to bypass the type checks
    const lastName = "Doe";
    const email = "john.doe@mail.com";
    const password = "password";
    const role = "organiser";

    //when
    const createUser = () => new User({
        username,
        firstName,
        lastName,
        email,
        password,
        role
    });

    //then
    expect(createUser).toThrow('First name is required');
});

test('given: empty string for last name, when: creating user, then: error is thrown', () => {
    //given
    const username = "john.doe";
    const firstName = "John";
    const lastName = "";
    const email = "john.doe@mail.com";
    const password = "password";
    const role = "organiser";

    //when
    const createUser = () => new User({
        username,
        firstName,
        lastName,
        email,
        password,
        role
    });

    //then
    expect(createUser).toThrow('Last name is required');
});

test('given: null for last name, when: creating user, then: error is thrown', () => {
    //given
    const username = "john.doe";
    const firstName = "John";
    const lastName = null as unknown as string; //force null to be a string by using TypeScript's type assertions to bypass the type checks
    const email = "john.doe@mail.com";
    const password = "password";
    const role = "organiser";

    //when
    const createUser = () => new User({
        username,
        firstName,
        lastName,
        email,
        password,
        role
    });

    //then
    expect(createUser).toThrow('Last name is required');
});

test('given: undefined for last name, when: creating user, then: error is thrown', () => {
    //given
    const username = "john.doe";
    const firstName = "John";
    const lastName = undefined as unknown as string; // force undefined to be a string by using TypeScript's type assertions to bypass the type checks
    const email = "john.doe@mail.com";
    const password = "password";
    const role = "organiser";

    //when
    const createUser = () => new User({
        username,
        firstName,
        lastName,
        email,
        password,
        role
    });

    //then
    expect(createUser).toThrow('Last name is required');
});
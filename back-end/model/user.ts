

export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;

    constructor(user: {id?: number; firstname: string; lastname: string; email: string; password: string}){
        this.id = user.id;
        this.firstName = user.firstname;
        this.lastName = user.lastname;
        this.email = user.email;
        this.password = user.password;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

}
import e from "express";
import { Club } from "../model/club";
import { User } from "../model/user";
import { Member } from "../model/member";
import { Organiser } from "../model/organiser";

// Create 4 organisers for the 4 clubs
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
const organiserJaneDoe = new Organiser({
    id: 2,
    user: new User({
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@mail.com",
        password: "password",
        role: "organiser"
    })
})
const organiserJackDoe = new Organiser({
    id: 3,
    user: new User({
        id: 3,
        firstName: "Jack",
        lastName: "Doe",
        email: "jack.doe@mail.com",
        password: "password",
        role: "organiser"
    })
})
const organiserJillDoe = new Organiser({
    id: 4,
    user: new User({
        id: 4,
        firstName: "Jill",
        lastName: "Doe",
        email: "jill.doe@mail.com",
        password: "password",
        role: "organiser"
    })
})
// Create 6 members for the 4 clubs
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
const memberCharlie = new Member({
    id: 3,
    user: new User({
        id: 7,
        firstName: "Charlie",
        lastName: "Doe",
        email: "charlie.doe@mail.com",
        password: "password",
        role: "member"
    })
})
const memberDavid = new Member({
    id: 4,
    user: new User({
        id: 8,
        firstName: "David",
        lastName: "Doe",
        email: "david.doe@mail.com",
        password: "password",
        role: "member"
    })
})
const memberEve = new Member({
    id: 5,
    user: new User({
        id: 9,
        firstName: "Eve",
        lastName: "Doe",
        email: "eve.doe@mail.com",
        password: "password",
        role: "member"
    })
})
const memberFrank = new Member({
    id: 6,
    user: new User({
        id: 10,
        firstName: "Frank",
        lastName: "Doe",
        email: "frank.doe@mail.com",
        password: "password",
        role: "member"
    })
})

// Create 4 clubs
const clubs: Club[] = [
    new Club({
        id: 1,
        name: "Checkmate Connoisseurs",
        description: "A chess club for strategy lovers, fostering intense matches and friendly competition among enthusiasts.",
        type: "Chess",
        members: [memberAlice, memberBob],
        organiser: organiserJohnDoe,
        events: []
    }),
    new Club({
        id: 2,
        name: "Hawaii Try-O",
        description: "An adventurous rugby club embracing teamwork, skill, and the spirit of aloha in every game.",
        type: "Rugby",
        members: [memberCharlie, memberDavid],
        organiser: organiserJaneDoe,
        events: []
    }),
    new Club({
        id: 3,
        name: "Queens of the Board",
        description: "A dynamic chess club celebrating female players, promoting strategy, skill, and camaraderie in the game.",
        type: "Chess",
        members: [memberEve, memberFrank],
        organiser: organiserJackDoe,
        events: []
    }),
    new Club({
        id: 4,
        name: "The Axebreakers",
        description: "A lively DnD group where imagination thrives, embarking on epic quests and creating unforgettable stories together.",
        type: "DnD",
        members: [memberAlice, memberBob, memberCharlie, memberDavid, memberEve, memberFrank],
        organiser: organiserJillDoe,
        events: []
    }),
];

const getAllClubs = (): Club[] => { return clubs }

const getClubById = ({ id }: { id: number }): Club | null => {
    return clubs.find(club => club.getId() === id) || null;
}

export default {
    getAllClubs,
    getClubById,
};
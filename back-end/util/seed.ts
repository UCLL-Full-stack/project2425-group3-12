import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Clean up existing data (optional)
    await prisma.memberClub.deleteMany({})
    await prisma.event.deleteMany({})
    await prisma.club.deleteMany({})
    await prisma.member.deleteMany({})
    await prisma.organiser.deleteMany({})
    await prisma.user.deleteMany({})

    // Create Organiser Users
    const organiserUsers = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@mail.com",
            password: "john123", // In production, this should be hashed
            role: "organiser",
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@mail.com",
            password: "jane123",
            role: "organiser",
        },
        {
            id: 3,
            firstName: "Jack",
            lastName: "Doe",
            email: "jack.doe@mail.com",
            password: "jack123",
            role: "organiser",
        },
        {
            id: 4,
            firstName: "Jill",
            lastName: "Doe",
            email: "jill.doe@mail.com",
            password: "jill123",
            role: "organiser",
        }
    ]

    // Create Member Users
    const memberUsers = [
        {
            id: 5,
            firstName: "Alice",
            lastName: "Doe",
            email: "alice.doe@mail.com",
            password: "alice123",
            role: "member",
        },
        {
            id: 6,
            firstName: "Bob",
            lastName: "Doe",
            email: "bob.doe@mail.com",
            password: "bob123",
            role: "member",
        },
        {
            id: 7,
            firstName: "Charlie",
            lastName: "Doe",
            email: "charlie.doe@mail.com",
            password: "charlie123",
            role: "member",
        },
        {
            id: 8,
            firstName: "David",
            lastName: "Doe",
            email: "david.doe@mail.com",
            password: "david123",
            role: "member",
        },
        {
            id: 9,
            firstName: "Eve",
            lastName: "Doe",
            email: "eve.doe@mail.com",
            password: "eve123",
            role: "member",
        },
        {
            id: 10,
            firstName: "Frank",
            lastName: "Doe",
            email: "frank.doe@mail.com",
            password: "frank123",
            role: "member",
        }
    ]

    console.log('Started seeding users...')

    // Create all users
    for (const userData of [...organiserUsers, ...memberUsers]) {
        await prisma.user.create({
            data: userData
        })
    }

    console.log('Creating organisers...')

    // Create Organisers
    for (let i = 0; i < organiserUsers.length; i++) {
        await prisma.organiser.create({
            data: {
                id: i + 1,
                userId: organiserUsers[i].id
            }
        })
    }

    console.log('Creating members...')

    // Create Members
    for (let i = 0; i < memberUsers.length; i++) {
        await prisma.member.create({
            data: {
                id: i + 1,
                userId: memberUsers[i].id
            }
        })
    }

    console.log('Creating clubs...')

    // Create Clubs
    const clubs = [
        {
            name: "Grand Masters Chess Club",
            description: "A club for chess enthusiasts of all levels",
            type: "Chess",
            organiserId: 1  // John Doe
        },
        {
            name: "Rugby Warriors",
            description: "Competitive rugby club for experienced players",
            type: "Rugby",
            organiserId: 1  // John Doe
        },
        {
            name: "Dragon Slayers DnD",
            description: "Weekly DnD campaigns and one-shots",
            type: "DnD",
            organiserId: 2  // Jane Doe
        },
        {
            name: "Soccer Stars",
            description: "Casual soccer club for all skill levels",
            type: "Soccer",
            organiserId: 3  // Jack Doe
        },
        {
            name: "Tennis Elite",
            description: "Professional tennis training and matches",
            type: "Tennis",
            organiserId: 4  // Jill Doe
        }
    ]

    for (const clubData of clubs) {
        await prisma.club.create({
            data: clubData
        })
    }

    console.log('Creating member-club associations...')

    // Create MemberClub associations
    const memberClubAssociations = [
        { memberId: 1, clubId: 1 },  // Alice - Chess
        { memberId: 1, clubId: 3 },  // Alice - DnD
        { memberId: 2, clubId: 2 },  // Bob - Rugby
        { memberId: 2, clubId: 4 },  // Bob - Soccer
        { memberId: 3, clubId: 3 },  // Charlie - DnD
        { memberId: 4, clubId: 5 },  // David - Tennis
        { memberId: 5, clubId: 1 },  // Eve - Chess
        { memberId: 5, clubId: 4 },  // Eve - Soccer
        { memberId: 6, clubId: 2 },  // Frank - Rugby
        { memberId: 6, clubId: 5 },  // Frank - Tennis
    ]

    for (const association of memberClubAssociations) {
        await prisma.memberClub.create({
            data: association
        })
    }

    console.log('Creating events...')

    // Create Events
    const events = [
        {
            title: "Weekly Chess Tournament",
            description: "Weekly chess tournament for all club members",
            location: "Main Hall",
            date: new Date("2024-12-20"),
            time: "18:00",
            clubId: 1
        },
        {
            title: "Rugby Practice",
            description: "Regular team practice session",
            location: "Sports Field",
            date: new Date("2024-12-21"),
            time: "16:00",
            clubId: 2
        },
        {
            title: "DnD Campaign Start",
            description: "Starting our new campaign - The Lost Mines",
            location: "Game Room",
            date: new Date("2024-12-22"),
            time: "19:00",
            clubId: 3
        },
        {
            title: "Soccer Match",
            description: "Friendly match against local team",
            location: "Soccer Field",
            date: new Date("2024-12-23"),
            time: "15:00",
            clubId: 4
        },
        {
            title: "Tennis Tournament",
            description: "Monthly tennis tournament",
            location: "Tennis Courts",
            date: new Date("2024-12-24"),
            time: "14:00",
            clubId: 5
        }
    ]

    for (const eventData of events) {
        await prisma.event.create({
            data: eventData
        })
    }

    console.log('Seeding finished.')
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Clean up existing data (optional)
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
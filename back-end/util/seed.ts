// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Clear existing data
    await prisma.event.deleteMany();
    await prisma.club.deleteMany();
    await prisma.member.deleteMany();
    await prisma.organiser.deleteMany();
    await prisma.user.deleteMany();

    // Create admin user
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            firstName: 'Malcolm',
            lastName: 'McDowell',
            email: 'admin@clubhub.com',
            password: await bcrypt.hash('admin123', 12),
            role: 'admin'
        }
    });

    // Create organiser users
    const organiserJohn = await prisma.organiser.create({
        data: {
            user: {
                create: {
                    username: 'john.doe',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'organiser'
                }
            }
        }
    });

    const organiserJane = await prisma.organiser.create({
        data: {
            user: {
                create: {
                    username: 'jane.doe',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jane.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'organiser'
                }
            }
        }
    });

    const organiserJack = await prisma.organiser.create({
        data: {
            user: {
                create: {
                    username: 'jack.doe',
                    firstName: 'Jack',
                    lastName: 'Doe',
                    email: 'jack.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'organiser'
                }
            }
        }
    });

    const organiserJill = await prisma.organiser.create({
        data: {
            user: {
                create: {
                    username: 'jill.doe',
                    firstName: 'Jill',
                    lastName: 'Doe',
                    email: 'jill.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'organiser'
                }
            }
        }
    });

    // Create member users
    const memberAlice = await prisma.member.create({
        data: {
            user: {
                create: {
                    username: 'alice.doe',
                    firstName: 'Alice',
                    lastName: 'Doe',
                    email: 'alice.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'member'
                }
            }
        }
    });

    const memberBob = await prisma.member.create({
        data: {
            user: {
                create: {
                    username: 'bob.doe',
                    firstName: 'Bob',
                    lastName: 'Doe',
                    email: 'bob.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'member'
                }
            }
        }
    });

    const memberCharlie = await prisma.member.create({
        data: {
            user: {
                create: {
                    username: 'charlie.doe',
                    firstName: 'Charlie',
                    lastName: 'Doe',
                    email: 'charlie.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'member'
                }
            }
        }
    });

    const memberDavid = await prisma.member.create({
        data: {
            user: {
                create: {
                    username: 'david.doe',
                    firstName: 'David',
                    lastName: 'Doe',
                    email: 'david.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'member'
                }
            }
        }
    });

    const memberEve = await prisma.member.create({
        data: {
            user: {
                create: {
                    username: 'eve.doe',
                    firstName: 'Eve',
                    lastName: 'Doe',
                    email: 'eve.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'member'
                }
            }
        }
    });

    const memberFrank = await prisma.member.create({
        data: {
            user: {
                create: {
                    username: 'frank.doe',
                    firstName: 'Frank',
                    lastName: 'Doe',
                    email: 'frank.doe@mail.com',
                    password: await bcrypt.hash('password', 12),
                    role: 'member'
                }
            }
        }
    });

    // Create clubs
    const chessClub = await prisma.club.create({
        data: {
            name: 'Checkmate Connoisseurs',
            description: 'A chess club for strategy lovers, fostering intense matches and friendly competition among enthusiasts.',
            type: 'Chess',
            organiserId: organiserJohn.id,
            members: {
                connect: [{ id: memberAlice.id }, { id: memberBob.id }]
            }
        }
    });

    const rugbyClub = await prisma.club.create({
        data: {
            name: 'Hawaii Try-O',
            description: 'An adventurous rugby club embracing teamwork, skill, and the spirit of aloha in every game.',
            type: 'Rugby',
            organiserId: organiserJane.id,
            members: {
                connect: [{ id: memberCharlie.id }, { id: memberDavid.id }]
            }
        }
    });

    const chessQueensClub = await prisma.club.create({
        data: {
            name: 'Queens of the Board',
            description: 'A dynamic chess club celebrating female players, promoting strategy, skill, and camaraderie in the game.',
            type: 'Chess',
            organiserId: organiserJack.id,
            members: {
                connect: [{ id: memberEve.id }, { id: memberFrank.id }]
            }
        }
    });

    const dndClub = await prisma.club.create({
        data: {
            name: 'The Axebreakers',
            description: 'A lively DnD group where imagination thrives, embarking on epic quests and creating unforgettable stories together.',
            type: 'DnD',
            organiserId: organiserJill.id,
            members: {
                connect: [
                    { id: memberAlice.id },
                    { id: memberBob.id },
                    { id: memberCharlie.id },
                    { id: memberDavid.id },
                    { id: memberEve.id },
                    { id: memberFrank.id }
                ]
            }
        }
    });

    // Create events
    await prisma.event.create({
        data: {
            title: 'Annual Chess Tournament',
            description: 'A competitive chess tournament with prizes for the top three participants.',
            location: 'Community Hall',
            date: new Date('2024-12-05'),
            time: '10:00',
            clubId: chessClub.id,
            participants: {
                connect: [{ id: memberAlice.id }]
            }
        }
    });

    await prisma.event.create({
        data: {
            title: 'Annual Rugby Championship',
            description: 'A competitive rugby match bringing together local teams for the championship title.',
            location: 'City Stadium',
            date: new Date('2024-11-07'),
            time: '14:00',
            clubId: rugbyClub.id,
            participants: {
                connect: [{ id: memberCharlie.id }, { id: memberDavid.id }]
            }
        }
    });
};

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
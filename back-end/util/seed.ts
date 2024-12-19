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
            lastName: 'Turner',
            email: 'admin@clubhub.com',
            password: await bcrypt.hash('password123', 12),
            role: 'admin'
        }
    });

    // Create organiser users
    const organiserData = [
        { username: 'sarah.wilson', firstName: 'Sarah', lastName: 'Wilson', email: 'sarah.wilson@mail.com' },
        { username: 'james.chen', firstName: 'James', lastName: 'Chen', email: 'james.chen@mail.com' },
        { username: 'olivia.patel', firstName: 'Olivia', lastName: 'Patel', email: 'olivia.patel@mail.com' },
        { username: 'marcus.rodriguez', firstName: 'Marcus', lastName: 'Rodriguez', email: 'marcus.rodriguez@mail.com' },
        { username: 'emma.thompson', firstName: 'Emma', lastName: 'Thompson', email: 'emma.thompson@mail.com' },
        { username: 'lucas.kim', firstName: 'Lucas', lastName: 'Kim', email: 'lucas.kim@mail.com' },
        { username: 'sofia.garcia', firstName: 'Sofia', lastName: 'Garcia', email: 'sofia.garcia@mail.com' },
        { username: 'william.taylor', firstName: 'William', lastName: 'Taylor', email: 'william.taylor@mail.com' }
    ];

    const organisers = await Promise.all(
        organiserData.map(org =>
            prisma.organiser.create({
                data: {
                    user: {
                        create: {
                            ...org,
                            password: bcrypt.hashSync('password123', 12),
                            role: 'organiser'
                        }
                    }
                }
            })
        )
    );

    // Create member users
    const memberData = [
        { username: 'alex.kumar', firstName: 'Alex', lastName: 'Kumar', email: 'alex.kumar@mail.com' },
        { username: 'maya.singh', firstName: 'Maya', lastName: 'Singh', email: 'maya.singh@mail.com' },
        { username: 'david.brown', firstName: 'David', lastName: 'Brown', email: 'david.brown@mail.com' },
        { username: 'nina.white', firstName: 'Nina', lastName: 'White', email: 'nina.white@mail.com' },
        { username: 'kai.zhang', firstName: 'Kai', lastName: 'Zhang', email: 'kai.zhang@mail.com' },
        { username: 'lena.miller', firstName: 'Lena', lastName: 'Miller', email: 'lena.miller@mail.com' },
        { username: 'ryan.jackson', firstName: 'Ryan', lastName: 'Jackson', email: 'ryan.jackson@mail.com' },
        { username: 'zara.ahmed', firstName: 'Zara', lastName: 'Ahmed', email: 'zara.ahmed@mail.com' },
        { username: 'leo.martinez', firstName: 'Leo', lastName: 'Martinez', email: 'leo.martinez@mail.com' },
        { username: 'ava.wilson', firstName: 'Ava', lastName: 'Wilson', email: 'ava.wilson@mail.com' },
        { username: 'noah.park', firstName: 'Noah', lastName: 'Park', email: 'noah.park@mail.com' },
        { username: 'isabel.santos', firstName: 'Isabel', lastName: 'Santos', email: 'isabel.santos@mail.com' }
    ];

    const members = await Promise.all(
        memberData.map(mem =>
            prisma.member.create({
                data: {
                    user: {
                        create: {
                            ...mem,
                            password: bcrypt.hashSync('password123', 12),
                            role: 'member'
                        }
                    }
                }
            })
        )
    );

    // Create clubs
    const clubsData = [
        {
            name: 'Checkmate Champions',
            description: 'Where strategic minds collide in epic chess battles and friendly banter!',
            type: 'Chess',
            organiserId: organisers[0].id,
            memberIds: [members[0].id, members[1].id, members[2].id]
        },
        {
            name: 'Dragon\'s Vault D&D',
            description: 'Embark on legendary quests, slay mythical beasts, and forge unforgettable stories!',
            type: 'DnD',
            organiserId: organisers[1].id,
            memberIds: [members[3].id, members[4].id, members[5].id, members[6].id]
        },
        {
            name: 'Tactical Knights',
            description: 'Advanced chess strategies and tournament preparation for serious players.',
            type: 'Chess',
            organiserId: organisers[2].id,
            memberIds: [members[7].id, members[8].id]
        },
        {
            name: 'Scrum & Tackle Rugby',
            description: 'Rugby enthusiasts united in the pursuit of victory and camaraderie!',
            type: 'Rugby',
            organiserId: organisers[3].id,
            memberIds: [members[9].id, members[10].id, members[11].id]
        },
        {
            name: 'Critical Quest',
            description: 'Where dice rolls determine destiny and imagination knows no bounds!',
            type: 'DnD',
            organiserId: organisers[4].id,
            memberIds: [members[0].id, members[3].id, members[6].id, members[9].id]
        },
        {
            name: 'Serve & Smash',
            description: 'Tennis excellence through practice, technique, and friendly competition.',
            type: 'Tennis',
            organiserId: organisers[5].id,
            memberIds: [members[1].id, members[4].id, members[7].id, members[10].id]
        },
        {
            name: 'Goal Getters FC',
            description: 'Uniting soccer enthusiasts in the pursuit of beautiful gameplay!',
            type: 'Soccer',
            organiserId: organisers[6].id,
            memberIds: [members[2].id, members[5].id, members[8].id, members[11].id]
        },
        {
            name: 'Endgame Elite',
            description: 'Mastering the art of chess through advanced strategy and tactical analysis.',
            type: 'Chess',
            organiserId: organisers[7].id,
            memberIds: [members[0].id, members[4].id, members[8].id]
        }
    ];

    const clubs = await Promise.all(
        clubsData.map(club =>
            prisma.club.create({
                data: {
                    name: club.name,
                    description: club.description,
                    type: club.type,
                    organiserId: club.organiserId,
                    members: {
                        connect: club.memberIds.map(id => ({ id }))
                    }
                }
            })
        )
    );

    // Create events (all in the future)
    const eventsData = [
        // Chess Events
        {
            title: 'Spring Chess Tournament',
            description: 'Annual spring championship with prizes for top performers!',
            location: 'Central Community Center',
            date: new Date('2025-03-15'),
            time: '13:00',
            clubId: clubs[0].id,
            participantIds: [members[0].id, members[1].id, members[2].id]
        },
        {
            title: 'Blitz Chess Night',
            description: 'Fast-paced chess matches with 5-minute time controls!',
            location: 'City Library - Game Room',
            date: new Date('2025-01-20'),
            time: '18:00',
            clubId: clubs[2].id,
            participantIds: [members[7].id, members[8].id]
        },
        // D&D Events
        {
            title: 'Epic Campaign Launch',
            description: 'Begin a new adventure in the Forgotten Realms!',
            location: 'Dragon\'s Lair Gaming Store',
            date: new Date('2025-01-10'),
            time: '17:00',
            clubId: clubs[1].id,
            participantIds: [members[3].id, members[4].id, members[5].id, members[6].id]
        },
        {
            title: 'One-Shot Mystery Adventure',
            description: 'Solve the mystery of the Haunted Lighthouse in one session!',
            location: 'The Gaming Table Café',
            date: new Date('2025-02-01'),
            time: '14:00',
            clubId: clubs[4].id,
            participantIds: [members[0].id, members[3].id, members[6].id]
        },
        // Rugby Events
        {
            title: 'Winter Rugby Tournament',
            description: 'Compete against local teams in this seasonal tournament!',
            location: 'City Sports Complex',
            date: new Date('2025-01-25'),
            time: '10:00',
            clubId: clubs[3].id,
            participantIds: [members[9].id, members[10].id, members[11].id]
        },
        {
            title: 'Rugby Skills Workshop',
            description: 'Master essential rugby techniques with professional coaches!',
            location: 'University Sports Field',
            date: new Date('2025-02-15'),
            time: '09:00',
            clubId: clubs[3].id,
            participantIds: [members[9].id, members[10].id]
        },
        // Tennis Events
        {
            title: 'Singles Tennis League',
            description: 'Weekly singles matches in a round-robin format!',
            location: 'Sunshine Tennis Courts',
            date: new Date('2025-03-01'),
            time: '15:00',
            clubId: clubs[5].id,
            participantIds: [members[1].id, members[4].id]
        },
        {
            title: 'Mixed Doubles Tournament',
            description: 'Partner up for this exciting doubles competition!',
            location: 'Central Tennis Club',
            date: new Date('2025-02-20'),
            time: '13:00',
            clubId: clubs[5].id,
            participantIds: [members[7].id, members[10].id]
        },
        // Soccer Events
        {
            title: '5-a-side Tournament',
            description: 'Fast-paced mini soccer tournament with multiple games!',
            location: 'Indoor Soccer Arena',
            date: new Date('2025-01-15'),
            time: '14:00',
            clubId: clubs[6].id,
            participantIds: [members[2].id, members[5].id, members[8].id]
        },
        {
            title: 'Soccer Skills Challenge',
            description: 'Test your dribbling, shooting, and passing skills!',
            location: 'Community Football Field',
            date: new Date('2025-03-10'),
            time: '16:00',
            clubId: clubs[6].id,
            participantIds: [members[2].id, members[11].id]
        },
        // More Chess Events
        {
            title: 'Chess Strategy Seminar',
            description: 'Learn advanced tactics from chess masters!',
            location: 'Chess Academy',
            date: new Date('2025-04-05'),
            time: '11:00',
            clubId: clubs[7].id,
            participantIds: [members[0].id, members[4].id]
        },
        {
            title: 'Chess Team Challenge',
            description: 'Club vs club team competition!',
            location: 'City Chess Center',
            date: new Date('2025-03-25'),
            time: '12:00',
            clubId: clubs[0].id,
            participantIds: [members[0].id, members[1].id]
        },
        // More D&D Events
        {
            title: 'Dungeon Master Workshop',
            description: 'Learn the art of storytelling and world-building!',
            location: 'Fantasy Gaming Hub',
            date: new Date('2025-02-28'),
            time: '15:00',
            clubId: clubs[1].id,
            participantIds: [members[3].id, members[4].id]
        },
        {
            title: 'Character Creation Festival',
            description: 'Create and develop unique characters for upcoming campaigns!',
            location: 'The Gaming Table Café',
            date: new Date('2025-04-15'),
            time: '16:00',
            clubId: clubs[4].id,
            participantIds: [members[0].id, members[3].id]
        },
        // More Tennis Events
        {
            title: 'Tennis Technique Workshop',
            description: 'Perfect your serve and volley with expert instruction!',
            location: 'Grand Slam Tennis Center',
            date: new Date('2025-05-01'),
            time: '10:00',
            clubId: clubs[5].id,
            participantIds: [members[1].id, members[10].id]
        },
        {
            title: 'Junior Tennis Development',
            description: 'Special training session for improving fundamentals!',
            location: 'Youth Sports Complex',
            date: new Date('2025-04-20'),
            time: '09:00',
            clubId: clubs[5].id,
            participantIds: [members[4].id, members[7].id]
        }
    ];

    await Promise.all(
        eventsData.map(event =>
            prisma.event.create({
                data: {
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    date: event.date,
                    time: event.time,
                    clubId: event.clubId,
                    participants: {
                        connect: event.participantIds.map(id => ({ id }))
                    }
                }
            })
        )
    );
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
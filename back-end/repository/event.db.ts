import { Event } from '../model/event';

const events: Event[] = [];

const getAllEvents = (): Event[] => {
    return events;
}

const getEventById = ({ id }: { id: number }): Event | null => {
    return events.find(event => event.getId() === id) || null;
}

export default {
    getAllEvents,
    getEventById,
};

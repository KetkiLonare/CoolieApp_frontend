import bookingsData from "../api/bookings.json";

export type Booking = {
    name: string;
    country?: string;
    state: string;
    city: string;
    luggage_weight: number;
    arrival_time: string;
    service_type: string;
    helper?: string;
    fare?: number;
    timestamp?: string;
};

const STORAGE_KEY = "frontend_bookings_cache";

function loadLocalBookings(): Booking[] {
    const local = localStorage.getItem(STORAGE_KEY);
    return local ? JSON.parse(local) : [...bookingsData];
}

function saveLocalBookings(bookings: Booking[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export const LocalBackend = {
    async getBookings(): Promise<{ bookings: Booking[] }> {
        return { bookings: loadLocalBookings().reverse() };
    },

    async book(data: Booking): Promise<Booking> {
        const fare = 30 + data.luggage_weight * 2.5;
        const helper = `Assigned Helper ${data.city.slice(0, 2).toUpperCase()}`;
        const timestamp = new Date().toISOString();
        const booking = { ...data, fare, helper, timestamp };

        const all = loadLocalBookings();
        all.push(booking);
        saveLocalBookings(all);
        return booking;
    },

    async deleteBooking(timestamp: string): Promise<boolean> {
        const all = loadLocalBookings().filter(b => b.timestamp !== timestamp);
        saveLocalBookings(all);
        return true;
    },

    async resetAll(): Promise<void> {
        localStorage.removeItem(STORAGE_KEY);
    },
};

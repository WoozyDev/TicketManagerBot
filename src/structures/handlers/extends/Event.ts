import { ClientEvents } from 'discord.js';
import TicketManager from '../../TicketManager';

export default class Event {

    name: string;
    constructor(name: keyof ClientEvents) {
        this.name = name;
    }

    async run(client: TicketManager, ...args) {}

}
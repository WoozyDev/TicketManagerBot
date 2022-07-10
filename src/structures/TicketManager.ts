import { Client, Collection, Intents } from 'discord.js';
import EventHandler from './handlers/EventHandler';
import Command from './handlers/extends/Command';

export default class TicketManager extends Client {

    static owner: string;
    static version: string;
    commands: Collection<string, Command>;

    constructor() {
        super({ intents: [...Object.values(Intents.FLAGS)] });
        TicketManager.owner = '';
        TicketManager.version = '0.0.1';
        this.commands = new Collection();
    }

    start(token) {
        this.login(token);
        EventHandler(this);
    }

}
import CommandHandler from '../structures/handlers/CommandHandler';
import Event from '../structures/handlers/extends/Event';
import TicketManager from '../structures/TicketManager';

export default class readyEvent extends Event {

    constructor() {
        super('ready');
    }

    async run(client: TicketManager): Promise<void> {
        console.log(`Logged in as ${client.user.tag}`);
        CommandHandler(client);
    }

}
import { CacheType, Interaction } from 'discord.js';
import Event from '../structures/handlers/extends/Event';
import TicketManager from '../structures/TicketManager';

export default class interactionCreateEvent extends Event {

    constructor() {
        super('interactionCreate');
    }

    async run(client: TicketManager, interaction: Interaction<CacheType>): Promise<void> {
        if(interaction.isCommand()) {
            let command = client.commands.get(interaction.commandName);
            if(!command) return;
            command.run(client, interaction, interaction.options);
        }
    }

}
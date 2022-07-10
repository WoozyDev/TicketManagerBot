import { CacheType, ClientEvents, CommandInteraction, CommandInteractionOptionResolver } from 'discord.js';
import TicketManager from '../../TicketManager';

export default class Command {

    name: string;
    description: string;
    category: string;
    
    data: any;
    options: (CommandOption | SubcommandOption)[];
    
    nsfwOnly: boolean;
    ownerOnly: boolean;

    permissions: any[];

    constructor(name: string, description: string, options: (CommandOption | SubcommandOption)[], nsfwOnly?: boolean, ownerOnly?: boolean) {
        this.name = name;
        this.description = description;
        this.options = options;
        this.data = {
            name,
            description,
            options
        };
        if(ownerOnly) {
            if(ownerOnly) {
                this.data.default_permission = false;
                this.permissions = [{
                    id: TicketManager.owner,
                    type: 'USER',
                    permission: true
                }];
            }
        }
    }

    async run(client: TicketManager, interaction: CommandInteraction<CacheType>, args: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>) : Promise<void> {}

    public toJSON() { return this.data; }

}

export type CommandOption = SubcommandOption | SubcommandGroupOption | BasicOption;
export type BasicOption = StringOption | BooleanOption | NumberOption | IntegerOption | ChannelOption | UserOption | MentionableOption | RoleOption | AttachmentOption;

export interface Option<Type extends OptionTypes> {
    type: Type;
    name: string;
    description: string;
    required?: boolean;
    choices?: OptionChoices[];
}

export interface StringOption extends Option<OptionTypes.String> {
    autocomplete?: boolean;
}
export interface BooleanOption extends Option<OptionTypes.Boolean> {}
export interface IntegerOption extends Option<OptionTypes.Integer> {
    autocomplete?: boolean;
}
export interface NumberOption extends Option<OptionTypes.Number> {
    autocomplete?: boolean;
}
export interface ChannelOption extends Option<OptionTypes.Channel> {}
export interface UserOption extends Option<OptionTypes.User> {}
export interface MentionableOption extends Option<OptionTypes.Mentionable> {}
export interface RoleOption extends Option<OptionTypes.Role> {}
export interface AttachmentOption extends Option<OptionTypes.Attachment> {}

export interface SubcommandOption extends Option<OptionTypes.Subcommand> {
    options: CommandOption[];
}

export interface SubcommandGroupOption extends Option<OptionTypes.SubcommandGroup> {
    options: SubcommandOption[];
}

export interface OptionChoices {
    name: string;
    value: string;
}

export const enum OptionTypes {
    Subcommand = 1,
    SubcommandGroup = 2,
    String = 3,
    Integer = 4,
    Boolean = 5,
    User = 6,
    Channel = 7,
    Role = 8,
    Mentionable = 9,
    Number = 10,
    Attachment = 11
}

export class makeChoice {
    name: string;
    value: string;
    constructor(name: string, value?: string) {
        this.name = name;
        this.value = value ? value : name;
    }

    toJSON(): OptionChoices {
        return {
            name: this.name,
            value: this.value
        }
    }

}
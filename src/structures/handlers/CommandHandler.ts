import { readdir } from 'fs';
import { Constants } from '../Constants';
import TicketManager from '../TicketManager';
import Command from './extends/Command';

export default (client: TicketManager) => {
    
    let guilds = client.guilds.cache
        .filter(a => ['TestServerId'].includes(a.id)); // <---

    // comment the line above to make it work for every
    // server not only the test server.

    readdir(`./${Constants.ROOT_FOLDER}/commands`, (err, folders) => {
        if(err) throw err;
        folders.forEach(folder => {
            readdir(`./${Constants.ROOT_FOLDER}/commands/${folder}`, (err, files) => {
                if(err) throw err;
                files.forEach(file => {
                    if(!file.endsWith(Constants.FILE_ENDING)) return;
                    // uncomment the line below and set it to your command so you can
                    // test it more easily (without loading all the commands
                    // and wait a lot of time)
                    // if(!['yourcommandname.ts'].includes(file)) return; // <----
                    let cmd = require(`../../commands/${folder}/${files}`);
                    if(!cmd.default || (!cmd.default as any) instanceof Command) return;
                    cmd = new cmd.default();
                        i++;
                        if(i === guilds.size) {
                            console.log(`Loaded '${cmd.name}' command.`);
                        }
                    })
                })
            })
        })
    })

}
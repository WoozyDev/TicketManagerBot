import { readdir } from 'fs';
import { Constants } from '../Constants';
import TicketManager from '../TicketManager';
import Event from './extends/Event';

export default (client: TicketManager) => {

    readdir(`./${Constants.ROOT_FOLDER}/events`, (err, files) => {
        if(err) throw err;
        files.forEach(file => {
            if(!file.endsWith(Constants.FILE_ENDING)) return;

            let ev = require(`../../events/${file}`);
            if(!ev.default || (!ev.default as any) instanceof Event) return;
            ev = new ev.default();
            client.on(ev.name, ev.run.bind(null, client));
            console.log(`Loaded '${ev.name}' event.`);

        })
    })

}
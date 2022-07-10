import TicketManager from './structures/TicketManager';
import { config } from 'dotenv';
config();

new TicketManager().start(process.env.token);
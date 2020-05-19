import { Application, Cron } from './deps.ts';
import { serverConfig } from './config.ts';
import router from './routes.ts';
import { Store } from './store.ts';

// Get the tweets initially
Store.updateTweets();

// Create a new cron job
let cron = new Cron();
cron.start();
cron.add("* * * * *", Store.updateTweets);

// Set up and start the server
const HOST = serverConfig.HOST || 'localhost';
const PORT = serverConfig.PORT || 8000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);

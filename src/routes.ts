import { Router }from './deps.ts';
import { init, getTweets, getTweetsSince } from './controller.ts';

const router = new Router();
router.get("/", init);
router.get("/api/tweets", getTweets);
router.get("/api/tweets/:sinceId", getTweetsSince);

export default router;

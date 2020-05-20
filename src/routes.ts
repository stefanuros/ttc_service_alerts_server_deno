import { Router }from './deps.ts';
import { getTweets, getTweetsSince } from './controller.ts';

const router = new Router();
router.get("/api/tweets", getTweets);
router.get("/api/tweets/:sinceId", getTweetsSince);

export default router;

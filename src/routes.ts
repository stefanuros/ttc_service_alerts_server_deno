import { Router }from './deps.ts';
import { getTweets, getNumTweets, getTweetsSince } from './controller.ts';

const router = new Router();
router.get("/api/tweets", getTweets);
router.get("/api/tweets/:num", getNumTweets);
router.get("/api/tweetsSince/:sinceId", getTweetsSince);

export default router;

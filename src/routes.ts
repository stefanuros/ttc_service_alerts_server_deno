import { Router }from './deps.ts';
import { init } from './controller.ts';

const router = new Router();
router.get("/", init);
router.get("/api/tweets", (context) => {});
router.get("/api/tweets/:id", (context) => {});

export default router;

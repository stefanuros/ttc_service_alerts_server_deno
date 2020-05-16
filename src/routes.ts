import { Router }from './imports.ts';
import { init } from './controller.ts';

const router = new Router();
router.get("/", init);

export default router;

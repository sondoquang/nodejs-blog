import express from 'express';
import newsController from '../app/controllers/MeController';
const router = express.Router();

router.get("/stored/courses", newsController.storedCourses)
router.put("/courses/:id/restore", newsController.restore)
router.delete("/courses/:id", newsController.remove)
router.get("/trash/courses", newsController.trash)

export default router;
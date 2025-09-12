import express from 'express';
import newsController from '../app/controllers/MeController';
const router = express.Router();

router.get("/stored/courses", newsController.storedCourses)
router.get("/trash/courses", newsController.trash)

export default router;
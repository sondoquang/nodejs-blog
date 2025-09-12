import express from 'express';
import courseController from "../app/controllers/CourseController";

const router = express.Router();

router.get("/create", courseController.create)
router.post("/store", courseController.store)
router.put("/:id", courseController.update)
router.delete("/:id", courseController.destroy)
router.get("/:id/edit", courseController.edit)
router.get("/:slug", courseController.detail)

export default router;
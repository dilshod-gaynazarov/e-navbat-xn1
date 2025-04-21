import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";

const router = Router();
const controller = new AdminController();

router.post('/', controller.createAdmin)
    .post('/signin', controller.signinAdmin)
    .get('/', controller.getAllAdmins)
    .get('/:id', controller.getAdminById)
    .patch('/:id', controller.updateAdminById)
    .delete('/:id', controller.deleteAdminById)

export default router;

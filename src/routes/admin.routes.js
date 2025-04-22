import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
import { AuthGuard } from '../middleware/jwt-auth.guard.js';
import { SuperAdminGuard } from '../middleware/super-admin.guard.js';

const router = Router();
const controller = new AdminController();

router.post('/', AuthGuard, SuperAdminGuard, controller.createAdmin)
    .post('/signin', controller.signinAdmin)
    .get('/', controller.getAllAdmins)
    .get('/:id', controller.getAdminById)
    .patch('/:id', controller.updateAdminById)
    .delete('/:id', AuthGuard, SuperAdminGuard, controller.deleteAdminById)

export default router;

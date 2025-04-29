import { Router } from 'express';
import { DoctorController } from '../controllers/doctor.controller.js';
import { AuthGuard } from '../middleware/jwt-auth.guard.js';
import { AdminGuard } from '../middleware/admin.guard.js';

const router = Router();
const controller = new DoctorController();

router
  .post('/', AuthGuard, AdminGuard, controller.createDoctor)
  .post('/signin', controller.signinDoctor)
  .post('/confirm-signin', controller.confirmSigninDoctor)
  .post('/token', controller.getAccessTokenDoctor)
  .post('/signout', controller.signoutDoctor);

export default router;

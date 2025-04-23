import Admin from '../models/admin.model.js';
import { adminValidator } from '../utils/admin.validation.js';
import { catchError } from '../utils/error-response.js';
import { decode, encode } from '../utils/bcrypt-encrypt.js';
import { successRes } from '../utils/success-response.js';
import jwt from 'jsonwebtoken';

export class AdminController {
    async createSuperAdmin(req, res) {
        try {
            const checkSuperAdmin = await Admin.findOne({ role: 'superadmin' });
            if (checkSuperAdmin) {
                catchError(409, 'Super admin already exist', res);
            };
            const { error, value } = adminValidator(req.body);
            if (error) {
                catchError(406, error, res);
            }
            const { username, password } = value;
            const hashedPassword = await decode(password, 7);
            const superadmin = await Admin.create({
                username, hashedPassword, role: 'superadmin'
            });
            successRes(res, 201, superadmin);
        } catch (error) {
            catchError(500, error.message, res);
        }
    }

    async createAdmin(req, res) {
        try {
            const { error, value } = adminValidator(req.body);
            if (error) {
                catchError(406, error, res);
            }
            const { username, password } = value;
            const hashedPassword = await decode(password, 7);
            const admin = await Admin.create({
                username, hashedPassword, role: 'admin'
            });
            successRes(res, 201, admin);
        } catch (error) {
            catchError(500, error.message, res);
        }
    }

    async getAllAdmins(_, res) {
        try {
            const admins = await Admin.find();
            successRes(res, 200, admins);
        } catch (error) {
            catchError(500, error.message, res);
        }
    }

    async getAdminById(req, res) {
        try {
            const id = req.params.id;
            const admin = await Admin.findById(id);
            if (!admin) {
                catchError(404, `Admin not found by ID ${id}`, res);
            }
            successRes(res, 200, admin);
        } catch (error) {
            catchError(500, error.message, res);
        }
    }

    async updateAdminById(req, res) {
        try {
            const id = req.params.id;
            const admin = await Admin.findById(id);
            if (!admin) {
                catchError(404, `Admin not found by ID ${id}`, res);
            }
            const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
            successRes(res, 200, updatedAdmin);
        } catch (error) {
            catchError(500, error.message, res);
        }
    }

    async deleteAdminById(req, res) {
        try {
            const id = req.params.id;
            const admin = await Admin.findById(id);
            if (!admin) {
                catchError(404, `Admin not found by ID ${id}`, res);
            }
            await Admin.findByIdAndDelete(req.params.id);
            successRes(res, 200, {});
        } catch (error) {
            catchError(500, error.message, res);
        }
    }

    async signinAdmin(req, res) {
        try {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username });
            if (!admin) {
                catchError(404, 'Admin not found', res);
            }
            const matchPassword = await encode(password, admin.hashedPassword);
            if (!matchPassword) {
                catchError(400, 'Invalid password', res);
            }
            const payload = { id: admin._id, role: admin.role };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
                expiresIn: process.env.ACCESS_TOKEN_TIME
            });
            successRes(res, 200, {
                token
            });
        } catch (error) {
            catchError(500, error.message, res);
        }
    }
}

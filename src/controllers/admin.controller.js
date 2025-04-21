import Admin from '../models/admin.model.js';
import { adminValidator } from '../utils/admin.validation.js';
import { catchError } from '../utils/error-response.js';
import * as bcrypt from 'bcrypt';

export class AdminController {
    async createAdmin(req, res) {
        try {
            const { error, value } = adminValidator(req.body);
            if (error) {
                throw new Error(`Admin ma'lumotlari xato kiritildi: ${error}`);
            }
            const { username, password, role } = value;
            const hashedPassword = await bcrypt.hash(password, 7);
            const newAdmin = await Admin.create({
                username, hashedPassword, role
            });
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newAdmin
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getAllAdmins(_, res) {
        try {
            const admins = await Admin.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: admins
            })
        } catch (error) {
            catchError(error, res);
        }
    }

    async getAdminById(req, res) {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) {
                throw new Error('Admin not found');
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: admin
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async updateAdminById(req, res) {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) {
                throw new Error('Admin not found');
            }
            const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedAdmin
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async deleteAdminById(req, res) {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) {
                throw new Error('Admin not found');
            }
            await Admin.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async signinAdmin(req, res) {
        try {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username });
            if (!admin){
                throw new Error('Username not found');
            }
            const matchPassword = await bcrypt.compare(password, admin.hashedPassword);
            if (!matchPassword){
                throw new Error('Invalid password');
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}

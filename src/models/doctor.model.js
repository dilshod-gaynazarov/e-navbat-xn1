import { model, Schema } from 'mongoose';

const doctorSchema = new Schema(
  {
    phoneNumber: { type: String, unique: true },
    fullName: { type: String },
    special: { type: String },
  },
  { timestamps: true }
);

const Doctor = model('Doctor', doctorSchema);
export default Doctor;

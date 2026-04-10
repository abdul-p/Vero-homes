import mongoose, {Schema , Document , Model} from "mongoose";
import bcrypt from "bcryptjs";



export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "visitor" | "agent" | "admin";
  avatar?: string;
  phone?: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
{
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"], 
      minlength: [6, "Password must be at least 6 characters"] 
    },
    role: { 
      type: String, 
      enum: ["visitor", "agent", "admin"], 
      default: "visitor" },
    avatar: String,
    phone: String,
  },
  { timestamps: true }
);


UserSchema.pre("save", async function (this: IUser) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = async function (candidatePAssword : string) : Promise<boolean> {
  return await bcrypt.compare(candidatePAssword, this.password);
};


const User : Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
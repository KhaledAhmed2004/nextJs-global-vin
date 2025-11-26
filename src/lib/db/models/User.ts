import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// User Roles enum values (matching auth.types.ts)
export const UserRoleValues = {
  SUPER_ADMIN: "super_admin",
  FRANCHISE_ADMIN: "franchise_admin",
  FRANCHISE_USER: "franchise_user",
} as const;

// Permission enum values (matching auth.types.ts)
export const PermissionValues = {
  VIEW_ALL_FRANCHISES: "view_all_franchises",
  MANAGE_FRANCHISES: "manage_franchises",
  VIEW_OWN_FRANCHISE: "view_own_franchise",
  VIEW_ALL_BILLING: "view_all_billing",
  MANAGE_ALL_PRICING: "manage_all_pricing",
  VIEW_OWN_BILLING: "view_own_billing",
  MANAGE_OWN_BILLING: "manage_own_billing",
  TOPUP_CREDITS: "topup_credits",
  MANAGE_FRANCHISE_USERS: "manage_franchise_users",
  VIEW_ALL_REPORTS: "view_all_reports",
  VIEW_FRANCHISE_REPORTS: "view_franchise_reports",
  VIEW_OWN_REPORTS: "view_own_reports",
  VIEW_ALL_ACTIVITY: "view_all_activity",
  VIEW_FRANCHISE_ACTIVITY: "view_franchise_activity",
  MANAGE_ALL_API: "manage_all_api",
  MANAGE_FRANCHISE_API: "manage_franchise_api",
  IMPERSONATE_FRANCHISE: "impersonate_franchise",
} as const;

// Role to Permissions mapping
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  [UserRoleValues.SUPER_ADMIN]: Object.values(PermissionValues),
  [UserRoleValues.FRANCHISE_ADMIN]: [
    PermissionValues.VIEW_OWN_FRANCHISE,
    PermissionValues.VIEW_OWN_BILLING,
    PermissionValues.MANAGE_OWN_BILLING,
    PermissionValues.TOPUP_CREDITS,
    PermissionValues.MANAGE_FRANCHISE_USERS,
    PermissionValues.VIEW_FRANCHISE_REPORTS,
    PermissionValues.VIEW_FRANCHISE_ACTIVITY,
    PermissionValues.MANAGE_FRANCHISE_API,
  ],
  [UserRoleValues.FRANCHISE_USER]: [
    PermissionValues.VIEW_OWN_FRANCHISE,
    PermissionValues.VIEW_OWN_REPORTS,
  ],
};

// User document interface
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  franchiseId?: mongoose.Types.ObjectId | null;
  avatar?: string | null;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: Object.values(UserRoleValues),
      default: UserRoleValues.FRANCHISE_USER,
    },
    franchiseId: {
      type: Schema.Types.ObjectId,
      ref: "Franchise",
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash password
userSchema.pre("save", async function () {
  // Only hash the password if it's modified (or new)
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Set permissions based on role
  this.permissions = ROLE_PERMISSIONS[this.role] || [];
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Transform output to match frontend User interface
userSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_doc: unknown, ret: any) => {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

// Prevent model recompilation in development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

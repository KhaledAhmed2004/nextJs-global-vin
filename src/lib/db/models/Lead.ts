import mongoose, { Schema, Document, Model } from "mongoose";

// Lead source types
export const LeadSourceValues = {
  CARFAX: "carfax",
  AUTOCHECK: "autocheck",
  CHINESE_API: "chinese-api",
  CONTACT: "contact",
} as const;

export type LeadSource = (typeof LeadSourceValues)[keyof typeof LeadSourceValues];

// Lead document interface
export interface ILead extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  source: LeadSource;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Lead schema
const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    source: {
      type: String,
      enum: Object.values(LeadSourceValues),
      required: [true, "Source is required"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "lost"],
      default: "new",
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for common queries
leadSchema.index({ source: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1 });

// Transform output
leadSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_doc: unknown, ret: any) => {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Prevent model recompilation in development
const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", leadSchema);

export default Lead;

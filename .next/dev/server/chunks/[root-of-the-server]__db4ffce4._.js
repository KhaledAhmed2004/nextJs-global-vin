module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/vin/GlobalVin-master/src/lib/db/connect.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
let cached = global.mongoose || {
    conn: null,
    promise: null
};
if (!global.mongoose) {
    global.mongoose = cached;
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log("✅ MongoDB connected successfully");
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectDB;
}),
"[project]/vin/GlobalVin-master/src/lib/db/models/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PermissionValues",
    ()=>PermissionValues,
    "ROLE_PERMISSIONS",
    ()=>ROLE_PERMISSIONS,
    "UserRoleValues",
    ()=>UserRoleValues,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vin/GlobalVin-master/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
const UserRoleValues = {
    SUPER_ADMIN: "super_admin",
    FRANCHISE_ADMIN: "franchise_admin",
    FRANCHISE_USER: "franchise_user"
};
const PermissionValues = {
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
    IMPERSONATE_FRANCHISE: "impersonate_franchise"
};
const ROLE_PERMISSIONS = {
    [UserRoleValues.SUPER_ADMIN]: Object.values(PermissionValues),
    [UserRoleValues.FRANCHISE_ADMIN]: [
        PermissionValues.VIEW_OWN_FRANCHISE,
        PermissionValues.VIEW_OWN_BILLING,
        PermissionValues.MANAGE_OWN_BILLING,
        PermissionValues.TOPUP_CREDITS,
        PermissionValues.MANAGE_FRANCHISE_USERS,
        PermissionValues.VIEW_FRANCHISE_REPORTS,
        PermissionValues.VIEW_FRANCHISE_ACTIVITY,
        PermissionValues.MANAGE_FRANCHISE_API
    ],
    [UserRoleValues.FRANCHISE_USER]: [
        PermissionValues.VIEW_OWN_FRANCHISE,
        PermissionValues.VIEW_OWN_REPORTS
    ]
};
// User schema
const userSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    name: {
        type: String,
        required: [
            true,
            "Name is required"
        ],
        trim: true,
        minlength: [
            2,
            "Name must be at least 2 characters"
        ],
        maxlength: [
            50,
            "Name cannot exceed 50 characters"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "Email is required"
        ],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [
            true,
            "Password is required"
        ],
        minlength: [
            6,
            "Password must be at least 6 characters"
        ],
        select: false
    },
    role: {
        type: String,
        enum: Object.values(UserRoleValues),
        default: UserRoleValues.FRANCHISE_USER
    },
    franchiseId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.ObjectId,
        ref: "Franchise",
        default: null
    },
    avatar: {
        type: String,
        default: null
    },
    permissions: {
        type: [
            String
        ],
        default: []
    }
}, {
    timestamps: true
});
// Pre-save middleware to hash password
userSchema.pre("save", async function() {
    // Only hash the password if it's modified (or new)
    if (!this.isModified("password")) {
        return;
    }
    const salt = await __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].genSalt(10);
    this.password = await __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(this.password, salt);
    // Set permissions based on role
    this.permissions = ROLE_PERMISSIONS[this.role] || [];
});
// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(candidatePassword, this.password);
};
// Transform output to match frontend User interface
userSchema.set("toJSON", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (_doc, ret)=>{
        ret.id = String(ret._id);
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    }
});
// Prevent model recompilation in development
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("User", userSchema);
const __TURBOPACK__default__export__ = User;
}),
"[project]/vin/GlobalVin-master/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vin/GlobalVin-master/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vin/GlobalVin-master/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$src$2f$lib$2f$db$2f$connect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vin/GlobalVin-master/src/lib/db/connect.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$src$2f$lib$2f$db$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vin/GlobalVin-master/src/lib/db/models/User.ts [app-route] (ecmascript)");
;
;
;
;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";
async function POST(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$src$2f$lib$2f$db$2f$connect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const body = await request.json();
        const { email, password } = body;
        // Validation
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Email and password are required"
            }, {
                status: 400
            });
        }
        // Find user by email (include password for comparison)
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$src$2f$lib$2f$db$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: email.toLowerCase()
        }).select("+password");
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Invalid email or password"
            }, {
                status: 401
            });
        }
        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Invalid email or password"
            }, {
                status: 401
            });
        }
        // Generate JWT token
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
            userId: user._id,
            email: user.email,
            role: user.role
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });
        // Return user data (password excluded by schema)
        const userData = user.toJSON();
        return __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Login successful",
            data: {
                token,
                user: userData
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Login error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error details:", errorMessage);
        return __TURBOPACK__imported__module__$5b$project$5d2f$vin$2f$GlobalVin$2d$master$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Internal server error",
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__db4ffce4._.js.map
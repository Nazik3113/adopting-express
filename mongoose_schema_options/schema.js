import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaOptions = { 
    autoIndex: true, // better in conenction
    autoCreate: true,
    // capped: 1024, // bytes
    capped: { size: 1024, max: 1000, autoIndexId: true },
    // bufferCommands: false, // better don't touch
    id: false, // remove alias "virtual field"
    _id: false, // only for child schemas
    minimize: true, // by default do not save empty objects
    read: "sp", // primary as p, primaryPreferred as pp, secondary as s, secondaryPreferred as sp, nearest(check by ping) as n
    writeConcern: {
        w: "majority", // number means write to num secondary databases
        j: true, // logs
        wtimeout: 1000 // write timeout
    },
    strict: true,
    strictQuery: true,
    typeKey: "$type", // change defult type to $type
    versionKey: "_versionKey", // false to disable
    skipVersioning: { emails: true }, // skip for current fields
    collation: { locale: "en_US", strength: 1 },
    timestamps: { createdAt: "created" }, // change default timestamps
    useNestedStrict: true,
    selectPopulatedPaths: true, // imitate joins by ObjectId
};

const userSchema = new Schema({
    name: { type: String, required: true, alias: "firstName" },
    sex: { type: String, enum: [ "m", "f" ], required: true, index: true },
}, schemaOptions);

userSchema.set("validateBeforeSave", false); // disable validations
userSchema.set("toJSON", { getters: true, virtuals: false}); // cahange toJSON func

export { userSchema };
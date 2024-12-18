//Defining User schema

import mongoose from "mongoose";

//Base user schema for reusability

const userSchema = new mongoose.Schema({
    name:{ type: String},
    role:{
        type:String,
        enum: ["customer","admin","DeliveryPartner"],
        required: true,
    },
    isActivated: { type:Boolean, default: false},
});


//Customer Schema
const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    phone: { type: Number, required: true, unique: true },
    role: {type: String, enum:["customer"], default:"Customer" },
    livelocation: {//using google API using reverse geocoding
        latitude: {type:Number},
        longitude: {type:Number},
    },
    address: { type: String},
});

//Delivery Partner Schema
const DeliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}, //Node security in groww clone
    phone: { type: Number, required: true, unique: true },
    role: {type: String, enum:["DeliveryPartner"], default:"DeliveryPartner" },
    livelocation: {//using google API using reverse geocoding
        latitude: {type:Number},
        longitude: {type:Number},
    },
    address: { type: String},
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
});


//Admin Schema
const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}, //Node security in groww clone
    role: {type: String, enum:["admin"], default:"admin" },
    });


export const Customer=mongoose.model("Customer",customerSchema)
export const DeliveryPartner=mongoose.model("DeliveryPartner",DeliveryPartnerSchema)
export const admin=mongoose.model("admin",adminSchema)
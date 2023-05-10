import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    year: {
      type: Number,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Car = model("car", carSchema);

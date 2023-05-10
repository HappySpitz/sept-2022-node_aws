import { Model, Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  avatar?: string;
  isActivated: boolean;
}

export interface IUserMethods {
  nameWithAge(): void;
}

export interface IUserVirtuals {
  nameWithSurname: string;
}

export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtuals> {
  findByName(name: string): Promise<IUser[]>;
}

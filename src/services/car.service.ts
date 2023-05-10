import { Types } from "mongoose";

import { Car } from "../dataBase";
import { ApiError } from "../errors";
import { carRepository } from "../repositories";
import { ICar } from "../types";

class CarService {
  public async getById(userId: string, carId: string): Promise<ICar> {
    try {
      return await carRepository.getByUserAndCar(userId, carId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: ICar, userId: Types.ObjectId): Promise<any> {
    try {
      return await Car.create({ ...data, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carService = new CarService();

import {Request, Response} from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
    async create(req: Request, resp: Response) {
        const {name, email} = req.body;

        const userReposiory = getRepository(User);

        const userAlreadyExists = await userReposiory.findOne({
            email
        });

        if(userAlreadyExists) {
            return resp.status(400).json({
                error: "User already exists!"
            })
        }

        const user = userReposiory.create({
            name, email
        });

        await userReposiory.save(user);

        return resp.json(user);
    }
}

export {UserController}
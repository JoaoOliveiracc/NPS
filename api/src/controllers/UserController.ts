import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
class UserController {
    async create(req: Request, resp: Response) {
        const {name, email} = req.body;

        const userReposiory = getCustomRepository(UsersRepository);

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

        return resp.status(201).json(user);
    }
}

export { UserController };

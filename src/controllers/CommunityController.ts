import { Request, Response, NextFunction } from "express";
import { validate } from "../middlewares/validator/validator";
import { createCommunitySchema } from "../validations/CreateCommunity";
import { makeCreateCommunityUseCase } from "../domains/community/create-community";
import { makeUpdateCommunityUseCase } from "../domains/community/update-community";
import { updateCommunitySchema } from "../validations/UpdateCommunity";

const createCommunity = makeCreateCommunityUseCase();
const updateCommunity = makeUpdateCommunityUseCase();
class CommunityController {
    create() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(createCommunitySchema, req)
                .then(async (validated) => {
                    return await createCommunity.execute({
                        communityData: validated.body,
                        creatorUserUuid: req.user.id,
                    });
                })
                .then((data) => res.status(201).send(data))
                .catch(next);
        };
    }
    update() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(updateCommunitySchema, req)
                .then(async (validated) => {
                    return await updateCommunity.execute(
                        req.user.id,
                        validated.body.communityUuid,
                        validated.body.community,
                    );
                })
                .then((data) => res.status(200).send(data))
                .catch(next);
        };
    }
}

export const communityController = new CommunityController();

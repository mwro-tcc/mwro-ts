import { NextFunction, Request, Response } from "express";
import { validate } from "../middlewares/validator/validator";
import { findByUuidSchema } from "../validations/FindByUuid";
import { makePgFavoriteAdapter } from "../infra/database/favorites";


const favoriteAdapter = makePgFavoriteAdapter()

class FavoriteController {
    create() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const assetUuid = req.params?.assetUuid
            const userUuid = req.user.id

            return await favoriteAdapter.create({
                assetUuid,
                userUuid
            }).then((data) => {
                res.status(201).send(data)
            }).catch(next);
        };
    }


    DeleteByAssetUuid() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(findByUuidSchema, req)
                .then(async (validated) => {
                    await favoriteAdapter.deleteAllByAssetAndUser(validated.params.uuid, req.user.id)
                })
                .then(() => {
                    res.status(204).send()
                })
                .catch(next);
        };
    }

}

export const favoriteController = new FavoriteController();

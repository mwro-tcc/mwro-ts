import { NextFunction, Request, Response } from "express";
import { validate } from "../middlewares/validator/validator";
import { findByUuidSchema } from "../validations/FindByUuid";
import { makePgReviewAdapter } from "../infra/database/review";
import { databaseConnectionPool } from "../database";
import { createReviewSchema } from "../validations/CreateReview";

const reviewAdapter = makePgReviewAdapter(databaseConnectionPool);

class ReviewController {
    create() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const assetUuid = req.params?.assetUuid
            const userUuid = req.user.id

            return await validate(createReviewSchema, req).then(async (validated) => {
                return await reviewAdapter.create({
                    score: validated.body.score,
                    comment: validated.body.comment,
                    assetUuid,
                    userUuid,
                }).then((data) => {
                    res.status(201).send(data)
                })
            }).catch(next);
        };
    }


    DeleteByAssetUuid() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(findByUuidSchema, req)
                .then(async (validated) => {
                    await reviewAdapter.deleteAllByAssetAndUser(validated.params.uuid, req.user.id)
                })
                .then(() => {
                    res.status(204).send()
                })
                .catch(next);
        };
    }

}

export const reviewController = new ReviewController();

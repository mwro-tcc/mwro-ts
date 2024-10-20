import { NextFunction, Request, Response } from "express";
import { makePgImageAdapter } from "../infra/database/images";
import { validate } from "../middlewares/validator/validator";
import { findByUuidSchema } from "../validations/FindByUuid";
import { StatusError } from "../constants/StatusError";


const imageAdapter = makePgImageAdapter()

class ImageController {
    create() {
        return async (req: any, res: Response, next: NextFunction) => {
            const fileBuffer = req.file?.buffer
            const fileMimetype = req.file?.mimetype || "" as string
            const fileFormat = fileMimetype.split("/")[1]

            const assetUuid = req.params?.assetUuid

            if (!fileBuffer) throw new StatusError(422, "No image has been uploaded")
            if (!assetUuid) throw new StatusError(422, "assetUuid field is required")

            return await imageAdapter.create({
                content: fileBuffer,
                format: fileFormat,
                assetUuid
            }).then((data) => {
                res.status(201).send(data)
            }).catch(next);
        };
    }


    findByAssetUuid() {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await validate(findByUuidSchema, req)
                .then(async (validated) => {
                    const image = await imageAdapter.findByAssetUuid(validated.params.uuid)
                    if (!image) throw new StatusError(404, "Asset not found")
                    return image
                })
                .then((data) => {
                    res.contentType("image/" + data.format)
                    res.send(data.content)
                })
                .catch(next);
        };
    }

}

export const imageController = new ImageController();

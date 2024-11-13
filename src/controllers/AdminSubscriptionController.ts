import { Request, Response, NextFunction } from "express";
import { makePgAdminSubscriptionsAdapter } from "../infra/database/admin-subscription";

const adminSubscriptionAdapter = makePgAdminSubscriptionsAdapter()
class AdminSubscriptionController {
    getMyActiveSubscription() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const userUuid = req.user.id;
            return adminSubscriptionAdapter
                .getUserActiveSubscription(userUuid)
                .then(data => res.status(200)
                    .send(data)).catch(next)
        }
    }
}

export const adminSubscriptionController = new AdminSubscriptionController();

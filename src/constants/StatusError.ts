export class StatusError extends Error {
    constructor(readonly statusCode: number, readonly message: string = "") {
        super(message);
    }
}

// TODO make these objects, with status code and message.
export const ErrorMessages = {
    emailAlreadyInUse: "Email already in use",
    passwordTooSmall: "Passwords must be at least 8 characters long",
    mustBeAuthenticated: "Only authenticated users can perform this action.",
    internalServerError: "Internal Server Error",
    routeNotFound: "Route not found",
    invalidCredentials: "Invalid Credentials",
    communityNotFound: "Community not found",
    userNotFound: "User not found",
    assetNotFound: "Asset not found",
    userNotAnAdmin: "User is not an admin of this community",
    userNotCreator: "User is not the creator of this community",
    userDontHaveSubscription: "User doesn't have an active subscription",
    userIsNotStoreOwner: "Only the owner of the store may perform this action",
    requestAlreadyReviewed: "This request has already been reviewed",
    storeAlreadyBelongsToACommunity: "This store already belongs to a community",
    storeNotFound: "Store not found",
    storeNotInCommunity: "Store is not in community",
    operationNotAllowed: "Operation not allowed"
};

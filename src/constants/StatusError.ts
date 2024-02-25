export class StatusError extends Error {
    constructor(
        readonly statusCode: number,
        readonly message: string = "",
    ) {
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
};

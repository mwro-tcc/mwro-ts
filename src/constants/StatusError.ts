export class StatusError extends Error {
	constructor(
		readonly statusCode: number,
		readonly message: string = ""
	) {
		super(message)
	}
}


export const ErrorMessages = {
	emailAlreadyInUse: 'Email already in use',
	passwordTooSmall: 'Passwords must be at least 8 characters long',
	mustBeAuthenticated: 'Only authenticated users can perform this action.',
	internalServerError: 'Internal Server Error',
	routeNotFound: 'Route not found'
}

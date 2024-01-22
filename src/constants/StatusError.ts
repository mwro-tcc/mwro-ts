export class StatusError extends Error {
	constructor(
		readonly statusCode: number,
		readonly msg?: string
	) {
		super(msg)
	}
}


export const ErrorMessages = {
	emailAlreadyInUse: 'Email already in use',
	passwordTooSmall: 'Passwords must be at least 8 characters long',
}

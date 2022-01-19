/* eslint-disable max-classes-per-file */
import { Request } from 'express';

export abstract class ServiceError extends Error {
	public code: string = 'EUNKNOWN';
	public httpStatus: number = 500;

	public toJSON() {
		return {
			code: this.code,
			name: this.name,
			httpStatus: this.httpStatus,
			message: this.message,
		};
	}
}

export class InvalidOptionError extends ServiceError {
	constructor(
		optionName: string,
		where?: string,
		expected?: string,
		actually?: string,
	) {
		let msg = `Invalid option '${optionName}'${
			where ? ` in ${where}` : ''
		}.`;

		if (expected) {
			msg += ` Expected ${expected}${
				actually ? `, but got \`${actually}\` instead` : ''
			}.`;
		}

		super(msg);

		this.name = 'InvalidOptionError';
		this.code = 'EINVALIDOPTION';
		this.httpStatus = 400;
	}
}

export class EmptyRequestError extends ServiceError {
	constructor(fields: string) {
		const msg = `There should be at least ${fields} fields in request body`;

		super(msg);

		this.name = 'EmptyRequestError';
		this.code = 'EEMPTYREQUEST';
		this.httpStatus = 400;
	}
}

export class NotUniqueError extends ServiceError {
	constructor(thing: string, option?: string, optionValue?: string) {
		const msg = `${thing}${
			option
				? ` with option ${option}${
						optionValue ? `=\`${optionValue}\`` : ''
				  }`
				: ''
		} already exists. Try to use another ${
			option ? `value for "${option}"` : 'one'
		}.`;

		super(msg);

		this.name = 'NotUniqueError';
		this.code = 'ENOTUNIQUE';
		this.httpStatus = 409;
	}
}

export class NotFoundError extends ServiceError {
	constructor(thing: string, optionName?: string, optionValue?: string) {
		const msg = `${thing}${
			optionName
				? ` with ${optionName}${
						optionValue ? `=\`${optionValue}\`` : ''
				  }`
				: ''
		} was not found.`;

		super(msg);

		this.name = 'NotFoundError';
		this.code = 'ENOTFOUND';
		this.httpStatus = 404;
	}
}

export class NotAllowedError extends ServiceError {
	constructor(req: Request) {
		const msg = `Method ${req.method} ${req.originalUrl} is not allowed.`;

		super(msg);

		this.name = 'NotAllowedError';
		this.code = 'ENOTALLOWED';
		this.httpStatus = 405;
	}
}

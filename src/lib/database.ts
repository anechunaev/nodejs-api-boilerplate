export function connect(host: string, user: string, accessToken: string) {
	return new Promise((resolve) => {
		// Don't forget to add retries!
		// Sometimes database can't accept connections immediatly after start of container.
		console.log(`==> Example DB mocked:\n\tHost: ${host}\n\tUser: ${user}\n\tAccess token: ${accessToken.split('').map(() => '*').join('')}`);
		resolve({
			query(_q: string) {
				return new Promise((_resolve, reject) => {
					reject("Not implemented");
				});
			},
		});
	});
}

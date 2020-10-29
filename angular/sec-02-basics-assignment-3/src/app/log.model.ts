export class Log {
	message: string;
	date;

	constructor(message: string) {
		this.message = message;

		this.date = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(new Date());
			}, 2000)
		});
	}

}
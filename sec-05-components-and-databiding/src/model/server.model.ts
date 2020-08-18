export class Server {
	constructor(public name: string, public type: string, public content: string) {}
}

export class ServerElement extends Server {
	
	constructor(name: string, content: string) {
		super(name, 'server', content)
	}
}

export class BlueprintElement extends Server {
	
	constructor(name: string, content: string) {
		super(name, 'blueprint', content)
	}
}
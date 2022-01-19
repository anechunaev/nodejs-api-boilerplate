export enum CreatureKind {
	Human,
	Dog,
};

class Creature {
	public id: number;
	public kind: CreatureKind;
	public name: string;
	public greeting: string;

	constructor(id: number, kind: CreatureKind = CreatureKind.Human, name: string = "Unknown", greeting: string = "Hello!") {
		this.id = id || 0;
		this.kind = kind;
		this.name = name;
		this.greeting = greeting;
	}

	public sayHello(): string {
		return this.greeting;
	}

	private getKindSlug(): string {
		if (this.kind === CreatureKind.Human) {
			return "Human";
		}

		return "Dog";
	}

	public toJSON() {
		return {
			id: this.id,
			kind: this.getKindSlug(),
			name: this.name,
			greeting: this.greeting,
		};
	}

	public toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

export default Creature;

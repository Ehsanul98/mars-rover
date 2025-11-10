import { Plateau } from '.';

export type Direction = 'N' | 'E' | 'S' | 'W';

export class Rover {
	private static readonly DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];

	constructor(
		private x: number,
		private y: number,
		private direction: Direction,
		private plateau: Plateau
	) {}

	public getPosition = (): string => {
		return `${this.x} ${this.y} ${this.direction}`;
	};

	private turnLeft = (): void => {
		const currentDirectionIndex = Rover.DIRECTIONS.indexOf(this.direction);
		this.direction = Rover.DIRECTIONS[(currentDirectionIndex + 3) % 4];
	};

	private turnRight = (): void => {
		const currentDirectionIndex = Rover.DIRECTIONS.indexOf(this.direction);
		this.direction = Rover.DIRECTIONS[(currentDirectionIndex + 1) % 4];
	};

	private moveForward = (): void => {
		if (this.direction === 'N' && this.plateau.height > this.y) {
			this.y++;
		} else if (this.direction === 'E' && this.plateau.width > this.x) {
			this.x++;
		} else if (this.direction === 'S' && this.y > 0) {
			this.y--;
		} else if (this.direction === 'W' && this.x > 0) {
			this.x--;
		}
	};

	public executeInstructions = (instructions: string): void => {
		for (const instruction of instructions) {
			switch (instruction) {
				case 'L':
					this.turnLeft();
					break;
				case 'R':
					this.turnRight();
					break;
				case 'M':
					this.moveForward();
					break;
				default:
					throw new Error(`Invalid instruction: ${instruction}`);
			}
		}
	};
}

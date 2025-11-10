import { Plateau } from '.';

export type Direction = 'N' | 'E' | 'S' | 'W';

/**
 * Represents a robotic rover navigating a Mars plateau.
 * The rover maintains its position and heading, executing movement commands
 * while respecting plateau boundaries.
 */
export class Rover {
	/** Ordered cardinal directions for rotation logic (clockwise: N -> E -> S -> W) */
	private static readonly DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];

	constructor(
		private x: number,
		private y: number,
		private direction: Direction,
		private plateau: Plateau
	) {}

	/**
	 * Returns the rover's current position and heading.
	 * @returns Position string in format "x y Direction" (e.g., "1 3 N")
	 */
	public getPosition = (): string => {
		return `${this.x} ${this.y} ${this.direction}`;
	};

	/**
	 * Rotates 90 degrees counterclockwise.
	 * Uses modulo arithmetic: (index + 3) % 4 moves left in circular array.
	 */
	private turnLeft = (): void => {
		const currentDirectionIndex = Rover.DIRECTIONS.indexOf(this.direction);
		this.direction = Rover.DIRECTIONS[(currentDirectionIndex + 3) % 4];
	};

	/** Rotates 90 degrees clockwise */
	private turnRight = (): void => {
		const currentDirectionIndex = Rover.DIRECTIONS.indexOf(this.direction);
		this.direction = Rover.DIRECTIONS[(currentDirectionIndex + 1) % 4];
	};

	/**
	 * Moves forward one grid point if within plateau boundaries.
	 * Silently ignores moves that would exceed boundaries.
	 */
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

	/**
	 * Executes a sequence of movement commands.
	 * @param instructions - String of commands: 'L' (left), 'R' (right), 'M' (move)
	 * @throws Error if instruction is invalid
	 */
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

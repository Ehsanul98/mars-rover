import { Rover, Direction } from './Rover';

/** Represents a rectangular plateau with defined boundaries */
export interface Plateau {
	width: number;
	height: number;
}

/**
 * Orchestrates the Mars rover simulation from input string to final positions.
 *
 * Input format:
 * Line 1: Plateau dimensions (width height)
 * Line 2n: Rover starting position (x y Direction)
 * Line 2n+1: Rover instructions (e.g., "LMLMLMLMM")
 *
 * @param input - Multi-line string containing plateau size and rover commands
 * @returns Newline-separated string of final rover positions
 * @throws Error if input format is invalid or instructions contain invalid characters
 *
 * @example
 * const input = `5 5
 * 1 2 N
 * LMLMLMLMM`;
 * runRoverSimulation(input); // Returns "1 3 N"
 */
export const runRoverSimulation = (input: string): string => {
	// Parse and clean input lines, removing empty lines and extra whitespace
	const lines = input
		.trim()
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.length > 0);

	if (lines.length < 1) {
		throw new Error('Input must contain plateau dimensions');
	}

	// Validate that each rover has both position and instruction lines
	if ((lines.length - 1) % 2 !== 0) {
		throw new Error('Each rover must have position and instruction lines');
	}

	// Parse plateau dimensions from first line
	const [plateauWidth, plateauHeight] = lines[0].split(' ');
	const plateau: Plateau = {
		width: Number(plateauWidth),
		height: Number(plateauHeight),
	};

	const roverResults: string[] = [];

	// Process each rover sequentially (pairs of lines: position + instructions)
	for (let i = 1; i < lines.length; i += 2) {
		const [roverX, roverY, roverDirection] = lines[i].split(' ');
		const rover = new Rover(
			Number(roverX),
			Number(roverY),
			roverDirection as Direction,
			plateau
		);
		const instructions = lines[i + 1];
		rover.executeInstructions(instructions);
		roverResults.push(rover.getPosition());
	}

	return roverResults.join('\n');
};

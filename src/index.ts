import { Rover, Direction } from './Rover';

export interface Plateau {
	width: number;
	height: number;
}

export const runRoverSimulation = (input: string) => {
	const lines = input
		.trim()
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.length > 0); // Remove empty lines

	if (lines.length < 1) {
		throw new Error('Input must contain plateau dimensions');
	}

	if ((lines.length - 1) % 2 !== 0) {
		throw new Error('Each rover must have position and instruction lines');
	}

	const [plateauWidth, plateauHeight] = lines[0].split(' ');
	const plateau: Plateau = {
		width: Number(plateauWidth),
		height: Number(plateauHeight),
	};

	const roverResults: string[] = [];

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

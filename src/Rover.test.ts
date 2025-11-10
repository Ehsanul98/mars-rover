import { Rover } from './Rover';
import { Plateau } from './index';

describe('Rover', () => {
	let plateau: Plateau = { width: 5, height: 5 };

	describe('Movement', () => {
		it('should move forward in each direction', () => {
			const roverN = new Rover(2, 2, 'N', plateau);
			roverN.executeInstructions('M');
			expect(roverN.getPosition()).toBe('2 3 N');

			const roverE = new Rover(2, 2, 'E', plateau);
			roverE.executeInstructions('M');
			expect(roverE.getPosition()).toBe('3 2 E');

			const roverS = new Rover(2, 2, 'S', plateau);
			roverS.executeInstructions('M');
			expect(roverS.getPosition()).toBe('2 1 S');

			const roverW = new Rover(2, 2, 'W', plateau);
			roverW.executeInstructions('M');
			expect(roverW.getPosition()).toBe('1 2 W');
		});

		it('should handle multiple forward movements', () => {
			const rover = new Rover(0, 0, 'N', plateau);
			rover.executeInstructions('MMM');
			expect(rover.getPosition()).toBe('0 3 N');
		});
	});

	describe('Rotation', () => {
		it('should turn left correctly', () => {
			const rover = new Rover(2, 2, 'N', plateau);
			rover.executeInstructions('L');
			expect(rover.getPosition()).toBe('2 2 W');

			rover.executeInstructions('L');
			expect(rover.getPosition()).toBe('2 2 S');
		});

		it('should turn right correctly', () => {
			const rover = new Rover(2, 2, 'N', plateau);
			rover.executeInstructions('R');
			expect(rover.getPosition()).toBe('2 2 E');

			rover.executeInstructions('R');
			expect(rover.getPosition()).toBe('2 2 S');
		});

		it('should complete full rotation', () => {
			const rover = new Rover(2, 2, 'N', plateau);
			rover.executeInstructions('RRRR');
			expect(rover.getPosition()).toBe('2 2 N');
		});
	});

	describe('Boundary conditions', () => {
		it('should not move beyond plateau boundaries', () => {
			const roverN = new Rover(2, 5, 'N', plateau);
			roverN.executeInstructions('M');
			expect(roverN.getPosition()).toBe('2 5 N');

			const roverE = new Rover(5, 2, 'E', plateau);
			roverE.executeInstructions('M');
			expect(roverE.getPosition()).toBe('5 2 E');

			const roverS = new Rover(2, 0, 'S', plateau);
			roverS.executeInstructions('M');
			expect(roverS.getPosition()).toBe('2 0 S');

			const roverW = new Rover(0, 2, 'W', plateau);
			roverW.executeInstructions('M');
			expect(roverW.getPosition()).toBe('0 2 W');
		});
	});

	describe('Complex sequences', () => {
		it('should execute LMLMLMLMM correctly - Test Case 1', () => {
			const rover = new Rover(1, 2, 'N', plateau);
			rover.executeInstructions('LMLMLMLMM');
			expect(rover.getPosition()).toBe('1 3 N');
		});

		it('should execute MMRMMRMRRM correctly - Test Case 2', () => {
			const rover = new Rover(3, 3, 'E', plateau);
			rover.executeInstructions('MMRMMRMRRM');
			expect(rover.getPosition()).toBe('5 1 E');
		});
	});
});

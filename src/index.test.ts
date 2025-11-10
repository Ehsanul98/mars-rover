import { runRoverSimulation } from './index';

describe('runRoverSimulation', () => {
	describe('Valid input', () => {
		it('should correctly process the provided test input', () => {
			const input = `5 5
                    1 2 N
                    LMLMLMLMM
                    3 3 E
                    MMRMMRMRRM`;

			const result = runRoverSimulation(input);
			expect(result).toBe('1 3 N\n5 1 E');
		});

		it('should handle single rover', () => {
			const input = `5 5
                    0 0 N
                    MMRMM`;

			const result = runRoverSimulation(input);
			expect(result).toBe('2 2 E');
		});

		it('should process multiple rovers sequentially', () => {
			const input = `5 5
                    1 1 N
                    MM
                    2 2 E
                    MM`;

			const result = runRoverSimulation(input);
			expect(result).toBe('1 3 N\n4 2 E');
		});

		it('should handle input with extra whitespace', () => {
			const input = `  5 5  
                      1 2 N  
                      LMLMLMLMM  `;

			const result = runRoverSimulation(input);
			expect(result).toBe('1 3 N');
		});

		it('should handle input with empty lines', () => {
			const input = `5 5

                    1 2 N

                    LMLMLMLMM`;

			const result = runRoverSimulation(input);
			expect(result).toBe('1 3 N');
		});

		it('should return results in correct order for three rovers', () => {
			const input = `5 5
                    1 1 N
                    M
                    2 2 E
                    M
                    3 3 S
                    M`;

			const result = runRoverSimulation(input);
			expect(result).toBe('1 2 N\n3 2 E\n3 2 S');
		});
	});

	describe('Different plateau sizes', () => {
		it('should work with small plateau', () => {
			const input = `2 2
                    0 0 N
                    MM`;

			const result = runRoverSimulation(input);
			expect(result).toBe('0 2 N');
		});

		it('should work with large plateau', () => {
			const input = `100 100
                  0 0 N
                  MMMMM`;

			const result = runRoverSimulation(input);
			expect(result).toBe('0 5 N');
		});
	});

	describe('Input validation', () => {
		it('should throw error for empty input', () => {
			expect(() => runRoverSimulation('')).toThrow(
				'Input must contain plateau dimensions'
			);
		});

		it('should throw error for whitespace-only input', () => {
			expect(() => runRoverSimulation('   \n  \n  ')).toThrow(
				'Input must contain plateau dimensions'
			);
		});

		it('should throw error for missing rover instructions', () => {
			const input = `5 5
                    1 2 N`;

			expect(() => runRoverSimulation(input)).toThrow(
				'Each rover must have position and instruction lines'
			);
		});

		it('should throw error for mismatched rover data', () => {
			const input = `5 5
                    1 2 N
                    LMLMLMLMM
                    3 3 E`;

			expect(() => runRoverSimulation(input)).toThrow(
				'Each rover must have position and instruction lines'
			);
		});

		it('should throw error for invalid instruction character', () => {
			const input = `5 5
                    1 2 N
                    LMXM`;

			expect(() => runRoverSimulation(input)).toThrow('Invalid instruction: X');
		});

		it('should throw error for lowercase instruction', () => {
			const input = `5 5
                    1 2 N
                    LMlM`;

			expect(() => runRoverSimulation(input)).toThrow('Invalid instruction: l');
		});

		it('should throw error for numeric instruction', () => {
			const input = `5 5
                    1 2 N
                    LM2M`;

			expect(() => runRoverSimulation(input)).toThrow('Invalid instruction: 2');
		});
	});
});

# Mars Rover Technical Challenge

A TypeScript solution for controlling robotic rovers on a Mars plateau using simple command sequences.

### Commands

- `L` - Turn 90 degrees left
- `R` - Turn 90 degrees right
- `M` - Move forward one grid point in the current direction

### Input Format

```
5 5           # Plateau dimensions (upper-right coordinates)
1 2 N         # Rover 1 starting position (x, y, direction)
LMLMLMLMM     # Rover 1 instructions
3 3 E         # Rover 2 starting position
MMRMMRMRRM    # Rover 2 instructions
```

### Output Format

```
1 3 N         # Rover 1 final position
5 1 E         # Rover 2 final position
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd mars-rover

# Install dependencies
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Project Structure

```
src/
├── index.ts           # Main simulation orchestration
├── Rover.ts          # Rover class with movement logic
├── index.test.ts     # Simulation tests
└── Rover.test.ts     # Rover tests
```

## Usage Example

```typescript
import { runRoverSimulation } from './index';

const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

const result = runRoverSimulation(input);
console.log(result);
// Output:
// 1 3 N
// 5 1 E
```

## Design Decisions

### Architecture

- **Rover Class**: Encapsulates rover state and movement logic
- **Plateau Interface**: Represents the grid boundaries
- **Simulation Function**: Orchestrates input parsing and rover deployment

### Error Handling

The solution validates input and throws descriptive errors for:

- Empty or invalid input
- Missing rover instructions
- Invalid command characters
- Mismatched rover data

## Implementation Notes

- Rovers process instructions sequentially (one completes before the next starts)
- Rovers cannot move beyond plateau boundaries
- Only uppercase commands (L, R, M) are accepted
- The coordinate system assumes north from (x, y) is (x, y+1)

## Requirements

- Node.js 14+
- TypeScript 4+
- Jest (for testing)

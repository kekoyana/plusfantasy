# Claude Development Guidelines

This document contains guidelines and rules for Claude when working on this project.

## Code Development Rules

### General Guidelines
- Always follow existing code conventions and patterns
- Use TypeScript for type safety
- Maintain the retro Famicom/Dragon Quest aesthetic
- Prefer editing existing files over creating new ones
- Never add comments unless explicitly requested

### Documentation Requirements

#### Debug Functionality Documentation
**IMPORTANT**: When creating or modifying debug functionality, you MUST document it in the appropriate section below.

Debug functions should be documented with:
- Function name and how to access it
- Purpose and what it does
- Parameters (if any)
- Example usage
- When to use it

## Debug Functions

### Game State Debug Functions

These functions are available in the browser console for debugging purposes:

#### `window.debugAddGold(amount: number)`
- **Purpose**: Adds the specified amount of gold to the player
- **Parameters**: `amount` - The amount of gold to add
- **Example**: `debugAddGold(1000000)` - Adds 1 million gold
- **Use case**: Testing game progression without manual clicking

#### `window.debugCheckGameState()`
- **Purpose**: Logs detailed information about the current game state to console
- **Parameters**: None
- **Returns**: Object with game state information including:
  - World tree status
  - Gold requirements
  - Clear conditions
  - Clear state flags
- **Example**: `debugCheckGameState()` - Displays current game state
- **Use case**: Debugging game clear mechanics and state inconsistencies

#### `window.debugResetClearState()`
- **Purpose**: Resets the game clear state flags (isGameCleared, hasShownClearScreen)
- **Parameters**: None
- **Example**: `debugResetClearState()` - Resets clear state
- **Use case**: Testing game clear screen display and logic

#### `window.debugForceGameClear()`
- **Purpose**: Forces the game into a cleared state regardless of actual conditions
- **Parameters**: None
- **Example**: `debugForceGameClear()` - Forces game clear
- **Use case**: Testing post-game content and prestige system

### Magic Stones Debug Functions

#### `window.debugAddMagicStones(amount: number)`
- **Purpose**: Adds the specified amount of Magic Stones to the player
- **Parameters**: `amount` - The number of Magic Stones to add
- **Example**: `debugAddMagicStones(50)` - Adds 50 Magic Stones
- **Use case**: Testing prestige upgrades and prestige system functionality
- **Note**: Updates both current and lifetime Magic Stones

#### `window.debugResetMagicStones()`
- **Purpose**: Resets both current and lifetime Magic Stones to 0
- **Parameters**: None
- **Example**: `debugResetMagicStones()` - Resets all Magic Stones
- **Use case**: Testing prestige system from clean state

#### `window.debugCheckPrestigeState()`
- **Purpose**: Logs comprehensive prestige system information to console
- **Parameters**: None
- **Returns**: Object with prestige state information including:
  - Current and lifetime Magic Stones
  - Prestige level and total points
  - Prestige availability and pending stones
  - All prestige upgrades with levels
- **Example**: `debugCheckPrestigeState()` - Displays prestige system state
- **Use case**: Debugging prestige calculations and upgrade states

### Usage Notes
- Debug functions are automatically attached to the window object in development
- Use these functions responsibly for testing purposes only
- Clear your save data if debug functions cause unexpected behavior

## Project Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Linting & Type Checking
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Architecture Notes

### Game State Management
- Main game state is managed through `useGameState` hook
- Uses `useLocalStorage` for persistence
- Prestige system integrates with main game state

### File Structure
- `/src/components/` - React components
- `/src/hooks/` - Custom React hooks
- `/src/types/` - TypeScript type definitions
- `/src/data/` - Game data and configuration
- `/src/utils/` - Utility functions and calculations

## Testing Guidelines

When testing new features:
1. Use debug functions to quickly reach desired game states
2. Test both normal progression and edge cases
3. Verify persistence across browser refreshes
4. Check mobile responsiveness
5. Ensure no console errors or warnings
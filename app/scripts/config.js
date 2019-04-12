// Import created game scenes.
import * as scenes from '@/scenes';

// Game canvas width.
export const width = 640;

// Game canvas height.
export const height = 480;

// Adjust zoom factor.
export const zoom = 1;

// Adjust pixel density of game graphics.
export const resolution = 1;

// Phaser chooses best rendering method based on device capabilities
export const type = Phaser.AUTO;

// Antialiasing - for pixel art
export const pixelArt = false;

// Canvas transparency
export const transparent = false;

// Canvas styling (will display in center)
export const canvasStyle = 'display: block; margin: 0 auto;';

// Defining default background color
export const backgroundColor = '#000000';

// Parameters for asset manager, pathed from app/static
export const loader = {
  path: 'assets/'
};

// Export game title, version, and web address as defined in the project package file
export {title, version, url} from '@/../../package.json';

// Export created game scenes.
export const scene = Object.values(scenes);

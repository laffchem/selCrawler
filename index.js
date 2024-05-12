import { instantiateDriver, goHome } from './logic.js';

// Necessary variables
const links = new Set();

const driver = await instantiateDriver();
await goHome(driver);

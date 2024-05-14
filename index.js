import {
	instantiateDriver,
	goHome,
	getCategoryLinks,
	getProductLinks,
} from './logic.js';
import { pages } from './pages.js';
import pLimit from 'p-limit';
import moment from 'moment';

// Necessary variables
const links = new Set();

const driver = await instantiateDriver();
await goHome(driver);
await getCategoryLinks(driver);
await driver.get('https://www.flexshopper.com/dp/apple');
await getProductLinks(driver);
await driver.quit();

import { Builder, By } from 'selenium-webdriver';
import 'chromedriver';
import { sleep } from './utils.js';
import fs from 'fs';
import moment from 'moment';

export async function instantiateDriver() {
	const driver = new Builder().forBrowser('chrome').build();
	await driver.manage().setTimeouts({ implicit: 120000 }); // Note this timeout is due to some brand pages taking long times to load. -- Samsung being one of the main ones.

	return driver;
}

export async function goHome(driver) {
	await driver.get('https://flexshopper.com');
}

export async function getCategoryLinks(driver) {
	const links = await driver.findElements(By.css('a'));
	const categoryLinks = await Promise.all(
		links.map(async (link) => {
			return await link.getAttribute('href');
		})
	);
	const filteredLinks = categoryLinks.filter((link) =>
		link.includes('/category')
	);
	console.log(filteredLinks);
	return filteredLinks;
}

export async function getProductLinks(driver) {
	const links = await driver.findElements(By.css('a'));
	const categoryLinks = await Promise.all(
		links.map(async (link) => {
			return await link.getAttribute('href');
		})
	);
	const filteredLinks = categoryLinks.filter((link) =>
		link.includes('/product')
	);
	console.log(filteredLinks);
	return filteredLinks;
}

export async function collectLinks(driver, method) {
	try {
		let scrapeComplete = false;
		while (!scrapeComplete) {
			await method(driver);
			const rfkNextFound = await _findClickNext(driver);
			if (rfkNextFound) {
				console.log('rfkNext found... continue link collection.');
			} else {
				console.log('rfkNext not found... terminate link collection.');
				scrapeComplete = true;
			}
		}
	} catch (err) {
		console.log('Error ', err);
		const logStream = fs.createWriteStream(this.errorLog);
		logStream.write(`${moment().format('YYYYMMDD_HHmm')}: ${err}\n`);
		logStream.close();
	}
}

async function _findClickNext(driver) {
	try {
		const nextButton = await driver.findElements(By.css('div.rfk_next'));
		if (nextButton.length > 0) {
			await nextButton[0].click();
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.log('Error: ', err);
		return false;
	}
}

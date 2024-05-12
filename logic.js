import { Builder, By } from 'selenium-webdriver';
import 'chromedriver';
import { sleep } from './utils.js';

export async function instantiateDriver() {
    const driver = new Builder().forBrowser('chrome').build();
    return driver;
}

export async function goHome(driver) {
    await driver.get('https://flexshopper.com');
    await sleep(10000);
    await driver.quit();
}

export async function scrapeCategories(driver) {
    const links = await driver.findElement(By.css('a'));
}

import { Builder, By } from 'selenium-webdriver';
import 'chromedriver';
import { sleep } from './utils.js';

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

/* The following comment line helps ESlint know which
   variables are global in scope.
*/

/* global beforeAll, afterAll, test, expect */
const puppeteer = require('puppeteer');
const validator = require('validator');

let browser;
let page;
let url;

/*  This functions run before all tests and
    it initializes the headless chrome browser
    that we're using to perform the tests.
*/
beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
});

/* This function runs after all the tests are
   done and it closes the browser we were using.
*/
afterAll(async () => {
    await browser.close();
});

test('The URL environment variable is defined and is a valid URL', () => {
    url = process.env.URL || '';
    const options = {
        require_protocol: true,
        protocols: ['http', 'https'],
        require_tld: false,
    };
    expect(validator.isURL(url, options)).toBe(true);
});

test('The URL is up and has title "cpsc213-ftw"', async () => {
    await page.goto(url, {
        waitUntil: 'networkidle2'
    });
    const title = await page.title();
    expect(title).toBe('cpsc213-ftw');
});

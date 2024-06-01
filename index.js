const {Builder, Browser} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const path = require("node:path");

const {program} = require('commander');

program
  .option('--browser <string>', 'ff or chrome', 'chrome')

program.parse();

const options = program.opts();

console.log(options);

const browser = options.browser;

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function buildChromeDriver() {
  const options = new chrome.Options();
  options.addExtensions(path.resolve(__dirname, 'Similarweb/hoklmmgfnpapgjgcpechhaamimifchmp_6.11.3.crx')); // 加载Similarweb插件
  options.addArguments('--proxy-server=http://127.0.0.1:8899'); // 走指定代理
  // options.addArguments('--headless'); // 无头
  // options.addArguments('--user-agent="Selenium"') // 自定义UserAgent

  const driver = await new Builder().forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
  return driver;
}


async function buildFirefoxDriver() {
  const options = new firefox.Options();
  options.addExtensions(path.resolve(__dirname, 'Similarweb/similarweb_sites_recommendatio-5.5.7.xpi')); // 加载Similarweb插件
  options.addArguments('--proxy-server=http://127.0.0.1:8899'); // 走指定代理
  // options.addArguments('--headless'); // 无头
  options.addArguments('--user-agent="Selenium"') // 自定义UserAgent

  const driver = await new Builder().forBrowser(Browser.FIREFOX)
    .setFirefoxOptions(options)
    .build();
  return driver;
}


(async function helloSelenium() {
  let driver;
  if (browser === 'ff') {
    driver = await buildFirefoxDriver();
  } else {
    driver = await buildChromeDriver();
  }
  await sleep(5);
  await driver.get('https://baidu.com');
  const tabArr = await driver.getAllWindowHandles();
  const windowBefore = tabArr[0];
  await driver.switchTo().window(windowBefore);
  await sleep(15);
  await driver.quit();
})();

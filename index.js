const {Builder, Browser} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require("node:path");

function sleep(seconds){
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

(async function helloSelenium() {
  const options = new chrome.Options();
  options.addExtensions(path.resolve(__dirname, 'Similarweb/hoklmmgfnpapgjgcpechhaamimifchmp_6.11.3.crx')); // 加载Similarweb插件
  options.addArguments('--proxy-server=http://127.0.0.1:8899'); // 走指定代理
  // options.addArguments('--headless'); // 无头
  // options.addArguments('--user-agent="Selenium"') // 自定义UserAgent

  const driver = await new Builder().forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
  await sleep(10);
  await driver.get('https://1991421.cn');
  const tabArr = await driver.getAllWindowHandles();
  const windowBefore = tabArr[0];
  await driver.switchTo().window(windowBefore);
  await sleep(10);
  await driver.quit();
})();

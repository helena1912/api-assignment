const { World, setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder, Capabilities, seleniumWebdriver } = require('selenium-webdriver');


var geckodriver = require('geckodriver');
var chrome = require('chromedriver');
var path = require('path')

//Setup default timeout configuration
global.defaultTimeOut = 60 * 1000;
setDefaultTimeout(global.defaultTimeOut);

class CustomWorld extends World {
    constructor(options) {

        super(options);
        for(const value in options.parameters) {
            this[value] = options.parameters[value]
        };
        this.envData = {};
        if(this.dataFilePath != undefined) {
            global.envData = require(path.resolve(this.dataFilePath));
        };
    };

    async init(scenario){
        var driver = null;
        if (this.browser == 'chrome'){
            driver = await new Builder().withCapabilities({
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSSLCerts: true,
                path: chrome.path
            }).build();
        }
        else if(this.browser == 'firefox'){
            driver = await new Builder().withCapabilities({
                browserName: 'firefox',
                javascriptEnabled: true,
                acceptSSLCerts: true,
                path: geckodriver.path
            }).build();
        };

        if(driver != null){
            driver.manage().window().maximize();
        };
        global.driver = driver;
    };

    async closeBrowser(){
        var browserName = this.browser;
        switch(this.browserTeardownStrategy){
            case 'none': 
                return Promise.resolve();
            case 'return': 
                return driver.manage().deleteAllCookies();
            default:
                return driver.close().then(function() {
                    if(browserName != 'firefox'){
                        return driver.quit();
                    }
                });
        }
    };
};

setWorldConstructor(CustomWorld);












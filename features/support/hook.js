var { BeforeAll, Before, After, Status} = require('@cucumber/cucumber');
var requireDir = require('require-dir');
global.reportsPath = "reports";

global.noScreenshot = false;

BeforeAll(function(){
    //import page objects and shared-object
    global.page = requireDir("../../page-objects", {camelcase: true, recurse: true});
    global.shareObj = requireDir("../../shared-objects", {camelcase: true, recurse: true});
});


Before({tags: "@uitest"}, async function (scenario) {
    await this.init(scenario);
});

After({tags: "@uitest"}, async function (scenario) {
    var world = this;
    if (scenario.result.status === Status.FAILED && !global.noScreenshot) {
        console.log("Capture screenshot");
        // add a screenshot to the error report
        await driver.takeScreenshot().then(function (screenShot) {
            world.attach(Buffer.from(screenShot, 'base64'), 'image/png');
        });
    }
    await this.closeBrowser();   
});
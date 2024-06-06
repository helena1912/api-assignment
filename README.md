# automation framework

## Need installation

Need to install Nodejs: https://nodejs.org/en/ 

Need to install these drivers globally so we can run it on the local machine without declaring in path

```
npm install -g geckodriver
npm install -g chromedriver
```

Then run:
```
npm install
```
To install required packages to the current project.

## Run the test

```sh
./node_modules/.bin/cucumber-js --world-parameters '{"browser":"chrome"}'
```



You can include more params by using the --world-paramerters. Ex:

```sh
./node_modules/.bin/cucumber-js --world-parameters '{"browser":"chrome", "browserTeardownStrategy": "clear"}'
./node_modules/.bin/cucumber-js --world-parameters '{\"browser\": \"chrome\", \"dataFilePath\":\"environments/dev.json\"}' -f html:report.html --tags "@focus"
```


Run on Window: 
 ./node_modules/.bin/cucumber-js --world-parameters '{\"browser\": \"chrome\", \"dataFilePath\":\"environments/dev.json\"}' -f html:report.html


To publish the report to cucumber report server, run below command:
```sh
./node_modules/.bin/cucumber-js --world-parameters '{"browser":"chrome", "dataFilePath":"environments/dev.json"}' --publish
```

To run the cucumber with specific profile (check the profile in the cucumber.js file):

```sh
./node_modules/.bin/cucumber-js -p profile-name
```

If no any ---world-parameters is included in command line, it will get 'default' option in /cucumber.js file by default.

```sh
./node_modules/.bin/cucumber-js
```




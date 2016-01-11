# mocha-json-tags-reporter
Mocha reporter similar to "JSON" but with tag parsing for more detailed reporting. Useful for persisting test results.

## Usage

#### From the command line

    > npm install --save-dev mocha-json-tags-reporter
    > mocha -R mocha-json-tags-reporter

#### From your `package.json`

    "scripts": {
        "tags": "mocha -R mocha-json-tags-reporter"
    },
    "devDependencies": {
        "mocha": "*",
        "mocha-json-tags-reporter": "*"
    }

Then simply:

    > npm run tags

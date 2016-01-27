# mocha-json-tags-reporter
Mocha reporter similar to "JSON" but with tag parsing for more detailed reporting. Useful for persisting test results.

## Integrating with Mocha tests
### Your test setup
```
var assert = require('assert'),
    Apple = require("../models/apple"),
    apple = null;

describe('Apple', function() {
    before(function() {
        apple = new Apple("granny smith");
    });

    describe("new Apple('String')", function(){
        it('should create a new apple object, should not be null or undefined #CreateApple @p0', function(){
            assert.notEqual(null, apple);
            assert.notEqual(undefined, apple);
        });
    });

    describe('getType()', function () {
        it('should return "granny smith" #GetTypeMethod @p1', function () {
            assert.equal("granny smith", apple.getType());
        });
    });
});
```
#### Test names/ID
Test names are specified by the character `#` preceding the name. In the above example, the test names are `CreateApple` and `GetTypeMethod`.

#### Test Priority 
The priority of a test is specified by `@p` and then a number specifying the priority level. In the above example, the test named `CreateApple` has priority `@p0`.

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

## Result

The above example would output:
```
TODO
```

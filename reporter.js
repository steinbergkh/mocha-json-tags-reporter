'use strict';

var Base = require('mocha').reporters.Base;

module.exports = JSONTags;

/**
 * Initialize a new `JSON-Tags` reporter.
 *
 * @api public
 * @param {Runner} runner
 */
function JSONTags(runner) {
  Base.call(this, runner);

  var self = this;
  var tests = [];
  var pending = [];
  var failures = [];
  var passes = [];
  var reportedTests = [];

  runner.on('test end', function(test) {
    tests.push(test);
  });

  runner.on('pass', function(test) {
    passes.push(test);
    reportedTests.push(test);
  });

  runner.on('fail', function(test) {
    failures.push(test);
    reportedTests.push(test);
  });

  runner.on('pending', function(test) {
    pending.push(test);
  });

  runner.on('end', function() {
    var obj = {
      stats: self.stats,
      tests: reportedTests.map(clean)
    };

    runner.testResults = obj;

    process.stdout.write(JSON.stringify(obj, null, 2));
  });
}

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @api private
 * @param {Object} test
 * @return {Object}
 */
function clean(test) {
  return {
    id: testId(test.title),
    title: test.title,
    fullTitle: test.fullTitle(),
    cleanFullTitle: fullNameNoTags(test.fullTitle()),
    duration: test.duration,
    currentRetry: test.currentRetry(),
    timedOut: test.timedOut,
    result: getResult(test),
    priority: getTestPriority(test.title),
    err: errorJSON(test.err || {})
  };
}


/**
 * Return result of test 
 * where passed==true and fail==false
 * 
 * @api private
 * @param {Object} test
 * @return {Boolean}
 */
function getResult(test){
  // pending tests don't have state object, count as fail
  if (typeof test.state === 'undefined'){
    return false;
  }
  return test.state === "passed";
}

/**
 * Extract test id from test name
 *
 * @api private
 * @param {Object} test
 * @return {String}
 */
function testId(testName){
  var re = /#([a-z]*-[0-9]*)/; 
  var m;
  var testId = 'NO-ID'; // default test id
   
  if ((m = re.exec(testName)) !== null) {
      if (m.index === re.lastIndex) {
          re.lastIndex++;
      }
      testId = m[1];
  }
  return testId;
}

/**
 * Remove all tags from full name of 
 * test and join together with space
 *
 * @api private
 * @param {Object} test
 * @return {String}
 */
function fullNameNoTags(fullTestName){
  var re = /(^|\s)([\/a-z ]*[a-z])/ig; 
  var m;
  var nameNoTags = [];
  while ((m = re.exec(fullTestName)) !== null) {
      if (m.index === re.lastIndex) {
          re.lastIndex++;
      }
      nameNoTags.push(m[2]);
  }
  nameNoTags = nameNoTags.join(' ');
  return nameNoTags;
}

/**
 * Remove all tags from end of string
 *
 * @api private
 * @param {String} test
 * @return {String}
 */
function removeTrailingTags(testTitle){
  var re = /([a-z ]*[a-z])/i; 
  var m;
  if ((m = re.exec(testTitle)) !== null) {
      if (m.index === re.lastIndex) {
          re.lastIndex++;
      }
  }
  return m[0];
}

/**
 * Get priority string from test title
 * if none found, returns string 'NONE'
 *
 * @api private
 * @param {String} testTitle
 * @return {String}
 */
function getTestPriority(testTitle){
  var re = /\@(p[0-9])/i; 
  var m;
  var priority = 'NONE';
  if ((m = re.exec(testTitle)) !== null) {
      if (m.index === re.lastIndex) {
          re.lastIndex++;
      }
      priority = m[1];
  }
  return priority;
}

/**
 * Transform `error` into a JSON object.
 *
 * @api private
 * @param {Error} err
 * @return {Object}
 */
function errorJSON(err) {
  var res = {};
  Object.getOwnPropertyNames(err).forEach(function(key) {
    res[key] = err[key];
  }, err);
  return res;
}

JSONTags.prototype = Object.create(Base.prototype);
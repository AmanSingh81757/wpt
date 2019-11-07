/**
* AUTO-GENERATED - DO NOT EDIT. Source: https://github.com/gpuweb/cts
**/

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class SkipTestCase extends Error {} // A Fixture is a class used to instantiate each test case at run time.
// A new instance of the Fixture is created for every single test case
// (i.e. every time the test function is run).

export class Fixture {
  constructor(rec, params) {
    _defineProperty(this, "params", void 0);

    _defineProperty(this, "rec", void 0);

    _defineProperty(this, "eventualExpectations", []);

    _defineProperty(this, "numOutstandingAsyncExpectations", 0);

    this.rec = rec;
    this.params = params;
  } // This has to be a member function instead of an async `createFixture` function, because
  // we need to be able to ergonomically override it in subclasses.


  async init() {}

  debug(msg) {
    this.rec.debug(msg);
  }

  log(msg) {
    this.rec.log(msg);
  }

  skip(msg) {
    throw new SkipTestCase(msg);
  }

  async finalize() {
    if (this.numOutstandingAsyncExpectations !== 0) {
      throw new Error('there were outstanding asynchronous expectations (e.g. shouldReject) at the end of the test');
    }

    await Promise.all(this.eventualExpectations);
  }

  warn(msg) {
    this.rec.warn(msg);
  }

  fail(msg) {
    this.rec.fail(msg);
  }

  async immediateAsyncExpectation(fn) {
    this.numOutstandingAsyncExpectations++;
    const ret = await fn();
    this.numOutstandingAsyncExpectations--;
    return ret;
  }

  eventualAsyncExpectation(fn) {
    const promise = fn();
    this.eventualExpectations.push(promise);
    return promise;
  }

  expectErrorValue(expectedName, ex, m) {
    if (!(ex instanceof Error)) {
      this.fail('THREW non-error value, of type ' + typeof ex);
      return;
    }

    const actualName = ex.name;

    if (actualName !== expectedName) {
      this.fail(`THREW ${actualName}, instead of ${expectedName}${m}`);
    } else {
      this.debug(`OK: threw ${actualName}${m}`);
    }
  }

  shouldReject(expectedName, p, msg) {
    this.eventualAsyncExpectation(async () => {
      const m = msg ? ': ' + msg : '';

      try {
        await p;
        this.fail('DID NOT THROW' + m);
      } catch (ex) {
        this.expectErrorValue(expectedName, ex, m);
      }
    });
  }

  shouldThrow(expectedName, fn, msg) {
    const m = msg ? ': ' + msg : '';

    try {
      fn();
      this.fail('DID NOT THROW' + m);
    } catch (ex) {
      this.expectErrorValue(expectedName, ex, m);
    }
  }

  expect(cond, msg) {
    if (cond) {
      const m = msg ? ': ' + msg : '';
      this.debug('expect OK' + m);
    } else {
      this.rec.fail(msg);
    }

    return cond;
  }

}
//# sourceMappingURL=fixture.js.map
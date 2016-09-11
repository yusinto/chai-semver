module.exports = (chai, utils) => {
  var Assertion = chai.Assertion;

  Assertion.addMethod('aboveVersion', function (expectedVersion) {
    const actualVersion = this._obj;

    const actualTokens = actualVersion.split('.');
    if (actualTokens.length !== 3) {
      this.assert(false,
        'The actual value #{this} is an invalid semver. It must be in the format of major.minor.patch.', '');
    }

    const expectedTokens = expectedVersion.split('.');
    if (expectedTokens.length !== 3) {
      this.assert(false,
        'The expected value #{exp} is an invalid semver. It must be in the format of major.minor.patch.', '', expectedVersion);
    }

    let result = true;

    for (let i = 0; i < 3; i++) {
      const actualNumber = Number(actualTokens[i]);
      const expectedNumber = Number(expectedTokens[i]);

      if (i === 2 && actualNumber === expectedNumber) {
        // we reached the patch number
        result = false;
        break;
      } else {
        if (actualNumber > expectedNumber) {
          result = true;
          break;
        }
        else if (actualNumber < expectedNumber) {
          result = false;
          break;
        } // else equal, we need to move to the next level
      }
    }

    this.assert(result,
      '#{this} is not above #{exp}',
      '#{this} is above #{exp}',
      expectedVersion);
  });

  Assertion.addMethod('atLeastVersion', function (expectedVersion) {
    const actualVersion = this._obj;

    const actualTokens = actualVersion.split('.');
    if (actualTokens.length !== 3) {
      this.assert(false,
        'The actual value #{this} is an invalid semver. It must be in the format of major.minor.patch.', '');
    }

    const expectedTokens = expectedVersion.split('.');
    if (expectedTokens.length !== 3) {
      this.assert(false,
        'The expected value #{exp} is an invalid semver. It must be in the format of major.minor.patch.', '', expectedVersion);
    }

    let result = true;

    for (let i = 0; i < 3; i++) {
      const actualNumber = Number(actualTokens[i]);
      const expectedNumber = Number(expectedTokens[i]);

      if (i === 2) {
        // we reached the patch number
        result = actualNumber >= expectedNumber;
        break;
      } else {
        if (actualNumber > expectedNumber) {
          result = true;
          break;
        }
        else if (actualNumber < expectedNumber) {
          result = false;
          break;
        } // else equal, we need to move to the next level
      }
    }

    this.assert(result,
      '#{this} is below #{exp}',
      '#{this} is above #{exp}',
      expectedVersion);
  });
};

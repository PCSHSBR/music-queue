/**
 * Calls a closure, retries on failure, and returns the value it gives.
 *
 * Usage:
 *   exponentialBackoff_(myFunction);
 *   // ...or:
 *   exponentialBackoff_(() => myFunction(param1, param2));
 *   // ...or:
 *   const result = exponentialBackoff_(() => myFunction(param1, param2));
 *   // ...or:
 *   const respondentEmail = exponentialBackoff_(() => e.response.getRespondentEmail());
 *
 * @see https://en.wikipedia.org/wiki/Exponential_backoff
 * @param {Function} action The closure to call.
 * @param {Number} maxNumTries Optional. The number of times to retry. Defaults to 5.
 * @return {Object} The closure return value.
 * @source https://stackoverflow.com/a/74952372
 */
function exponentialBackoff_(action, maxNumTries = 10) {
  // version 1.0, written by --Hyde, 29 December 2022
  //  - see https://stackoverflow.com/a/74952372/13045193
  for (let tryNumber = 1; tryNumber <= maxNumTries; tryNumber++) {
    try {
      return action();
    } catch (error) {
      Logger.log("try: " + tryNumber);
      if (tryNumber >= maxNumTries) {
        throw error;
      }
      Utilities.sleep(2 ** (tryNumber - 1) * 1000);
    }
  }
}

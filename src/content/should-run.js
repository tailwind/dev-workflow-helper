/**
 * Return true if the content script should run
 *
 * @returns {boolean}
 */
export const shouldRun = () =>
  window.location.href.includes('github.com') && window.location.href.includes('pull');

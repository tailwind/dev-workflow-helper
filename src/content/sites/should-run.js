import {onGithub} from './on-github';
import {onIntercom} from './on-intercom';

/**
 * Return true if the content script should run
 *
 * @returns {boolean}
 */
export const shouldRun = () => onGithub() || onIntercom();

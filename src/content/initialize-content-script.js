import {reviewerChecklist} from './config';
import {injectReviewerTemplate} from './sites/github';
import {shouldRun} from './sites/should-run';
import {onGithub} from './sites/on-github';
import {onIntercom} from './sites/on-intercom';
import {insertInboxButtons} from './sites/intercom';

/**
 * This function is the caller for each of the various functions handled by the extension.
 */
export const initializeContentScript = () => {
  if (!shouldRun()) return;

  if (onGithub()) {
    injectReviewerTemplate();
  }

  if (onIntercom()) {
    insertInboxButtons();
  }
};

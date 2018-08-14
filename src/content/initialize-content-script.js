import {reviewerChecklist} from './config';
import {injectReviewerTemplate} from './pull-requests';
import {shouldRun} from './should-run';

/**
 * This function is the caller for each of the various functions handled by the extension.
 */
export const initializeContentScript = () => {
  if (!shouldRun()) return;

  injectReviewerTemplate();
};

import {reviewerChecklist, selectors} from '../../config/index';

/**
 * Inject the reviewer template into the PR reviewer text boxes
 */
export const injectReviewerTemplate = () => {
  /**
   * @type {Node[]}
   */
  const reviewerCommentBoxes = Array.from(document.querySelectorAll(selectors.github.pullRequests.newCommentBox));

  /**
   *
   * @type {Node[]}
   */
  const reviewBodies = Array.from(document.querySelectorAll(selectors.github.pullRequests.reviewBox));

  /**
   * It's likely that one of these DOM elements doesn't exist, but it's possible, so we need to
   * allow for both of them to exist while handling the case when one (or both) does not.
   */
  [...reviewerCommentBoxes, ...reviewBodies].forEach(textBoxElement => {
    textBoxElement.textContent = reviewerChecklist;
  });
};

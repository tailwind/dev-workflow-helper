/**
 * Selectors used throughout the extension to manipulate existing DOMNodes.
 *
 * Idea: Read these in from an optional config file, or retrieve them from a trusted URL, so that
 * changes in GitHub's DOM structure don't require new extension versions.
 *
 * @type {{pullRequests: {newCommentBox: string, reviewBox: string}}}
 */
export const selectors = {
  /**
   * Selectors used in the pull request views
   */
  pullRequests: {
    /**
     * Textarea used to add a new comment to a pull request from the conversation tab
     */
    newCommentBox: 'textarea#new_comment_field',
    /**
     * Textarea used to add a review comment (i.e. the box that includes options to request changes,
     * approve, or just comment on a PR)
     */
    reviewBox: '#pull_request_review_body',
  }
};

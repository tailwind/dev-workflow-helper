/**
 * This wraps the extension-context LocalStorage instance so that we can use it the same way
 * that we could use window.localStorage in a typical web application.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.method) {
    case 'SET_LOCAL_STORAGE':
      localStorage.setItem(request.key, request.payload);
    case 'REQUEST_LOCAL_STORAGE':
      sendResponse(localStorage.getItem(request.key));
      break;
    case 'REMOVE_ITEM_LOCAL_STORAGE':
      localStorage.removeItem(request.key);
      sendResponse({});
      break;
    case 'CLEAR_LOCAL_STORAGE':
      localStorage.clear();
      break;
    default:
      sendResponse({});
  }
});

/**
 * GitHub uses the History API for client-side navigation. Since the content script only runs
 * on page load, we need to retrigger it on every virtual page change.
 */
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: 'RUN_CONTENT_SCRIPT'});
  });
});

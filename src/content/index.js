import {initializeContentScript} from './initialize-content-script';

/**
 * This file is the entry point for the content script.
 */
initializeContentScript();

/**
 * GitHub uses client-side routing, so this script is only ran once. To work around this,
 * we need to rerun our script on every page change done through the History API.
 */
chrome.runtime.onMessage.addListener(message => {
  switch (message.method) {
    case 'RUN_CONTENT_SCRIPT':
      initializeContentScript();
      break;
  }
});

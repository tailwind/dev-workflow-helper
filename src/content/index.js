import {shouldRun} from './should-run';
import {initializeContentScript} from './initialize-content-script';

/**
 * This file is the entry point for the content script.
 */

if (shouldRun()) {
  initializeContentScript();
}

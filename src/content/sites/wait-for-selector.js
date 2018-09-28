export const waitForSelector = (selector, timeout = 30000) => new Promise((resolve, reject) => {
  const waitingForInterval = setInterval(() => {
    const element = document.querySelector(selector);

    if (element) {
      clearInterval(waitingForInterval);
      resolve();
    }

  }, 200);

  setTimeout(() => {
      clearInterval(waitingForInterval);
      reject();
  }, timeout);
});

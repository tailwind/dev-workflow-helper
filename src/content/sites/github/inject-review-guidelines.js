import {selectors, externalCssClasses} from '../../config';
import {waitForSelector} from '../wait-for-selector';

const buttonClass = 'tw-github-button';

export const injectReviewGuidelines = async () => {
  console.log(buttonClass);
  const existingButtons = document.getElementsByClassName(buttonClass);
  if (Array.from(existingButtons).length) {
    return;
  }

  injectButtonIntoContainer(
    selectors.github.pullRequests.newCommentAreaButtonContainer
  );

  injectButtonIntoContainer(
    selectors.github.pullRequests.reviewDropdownButtonContainer
  );
};

const createButton = () => {
  const button = document.createElement('button');

  button.innerHTML =
  `<img src="https://www.tailwindapp.com/favicon.ico" style="height:14px" /> PR Review Guidelines`;

  button.onclick = e => {
    e.preventDefault();
    window.open('https://docs.google.com/document/d/1URjdrHJjfL4iBuKgQSdTJ0-N1SDzPCQbBkKJ-0sPGdY/edit?usp=sharing', '_blank');
  };

  return button;
};

const injectButtonIntoContainer = async (selector) => {
  try {
    await waitForSelector(selector);

    const newCommentAreaButtonContainer = document.querySelector(
      selector
    );

    const button = createButton();
    button.classList.add(buttonClass);
    externalCssClasses.github.button.lightGray.forEach(cssClass => {
      button.classList.add(cssClass);
    });

    newCommentAreaButtonContainer.appendChild(button);
  } catch (e) {
    console.error("Can't find the button anchor element");
  }
};

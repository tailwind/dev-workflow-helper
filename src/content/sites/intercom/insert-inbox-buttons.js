import {selectors} from '../../config';
import {waitForSelector} from '../wait-for-selector';

const onhover = e => {
  e.target.style.opacity = .9;
};

const buttonOptions = [
  {
    text: '💻 View Tailwind Account',
    onclick: e => {
      const custIdElement = document.querySelector(selectors.intercom.sidebar.custIdHolder);
      const custId = custIdElement && custIdElement.textContent;
      if (custId) {
        window.open(`https://www.tailwindapp.com/admin/switch/?cust_id=${custId}&no_redirect=1`, '_blank');
      }
    },
    style: {
      backgroundColor: '#0793CA',
      color: '#ffffff'
    },
    onhover
  },
  {
    text: '💰 View Chargify',
    onclick: async e => {
      const {chargifyID} = await getChargifyData();

      if (chargifyID) {

        /**
         * Calling getChargifyData will scroll the sidebar to the bottom, which means you would have
         * to scroll up to the top of the sidebar every time. This fixes that issue by scrolling to
         * the topmost element in the sidebar.
         */
        const buttonContainer = document.getElementById(selectors.intercom.buttonContainerId);
        if (buttonContainer) {
          /**
           * Intercom will steal focus and scroll the page down again. This timeout gives us plenty
           * of time to let that happen while being short enough that it won't be noticeable, since
           * this click handler opens a new tab and it will (effectively) happen in the background.
           */
          setTimeout(() => buttonContainer.scrollIntoView(), 500);
        }

        window.open(`https://tailwind.chargify.com/customers/${chargifyID}`, '_blank');
      }
    },
    style: {
      backgroundColor: '#3CB778',
      color: '#ffffff'
    },
    onhover
  },
  {
    text: '⚙ View Admin',
    onclick: async e => {
      const {companyId: orgId} = await getOrgId();
      console.log(orgId);

      const adminDashboardUrl = orgId => `https://admin.tailwindapp.com/customers?org_id=${orgId}`;

      window.open(adminDashboardUrl(orgId), '_blank');
    },
    style: {
      backgroundColor: '#C6C6C6',
      color: '#000000'
    },
    onhover
  }
];

export const insertInboxButtons = async () => {
  try {
    await waitForSelector(selectors.intercom.sidebar.buttonAnchor);

    /**
     * Remove old buttons when switching conversations in Intercom
     * @type {Element | null}
     */
    const existingButtons = document.querySelector('#tw-intercom-button-container');
    if (existingButtons) {
      existingButtons.remove();
    }

    const buttonAnchor = document.querySelector(selectors.intercom.sidebar.buttonAnchor);
    const buttons = createButtons(buttonOptions);

    buttonAnchor.insertAdjacentElement('beforeend', buttons);
  } catch (e) {
    console.error("Can't find the button anchor element");
  }
};

const createButtons = (buttonOptions = []) => {
  const buttonContainer = document.createElement('div');
  buttonContainer.id = selectors.intercom.buttonContainerId;
  buttonContainer.style.display = 'flex';
  buttonContainer.style.flexDirection = 'column';
  buttonContainer.style.height = '132px';

  const buttons = buttonOptions.map(options => createButton(options));

  buttons.forEach(button => buttonContainer.appendChild(button));

  return buttonContainer;
};

const createButton = (options = {}) => {
  const button = document.createElement('button');
  button.textContent = options.text || '';

  button.style.backgroundColor = options.style.backgroundColor;
  button.style.color = options.style.color;
  button.style.padding = '4px';
  button.style.height = '40px';
  button.style.marginBottom = '5px';
  button.style.borderRadius = '6px';

  button.onclick = options.onclick;
  button.onmouseover = options.onhover;
  button.onmouseout = e => {
    e.target.style.opacity = 1;
  };

  return button;
};

/**
 * @author Alex McKenzie
 * @returns {Promise<any>}
 */
function getChargifyData() {
  return new Promise(resolve => {
    const showXpath = document.evaluate(selectors.intercom.chargifyXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let index = 0; index < showXpath.snapshotLength; index++) {
      showXpath.snapshotItem(index).click();
    }

    // Load Charigfy ID

    setTimeout(() => {
      const chargifyID = document.querySelector(selectors.intercom.chargifyIdHolder).innerText;

      resolve({ chargifyID })
    }, 0);

  })
}

/**
 * @author Alex McKenzie
 * @param {boolean} shouldRetry
 * @returns {Promise<any>}
 */
function getOrgId(shouldRetry = true) {
  return new Promise(resolve => {
    const companyElements = document.querySelectorAll(selectors.intercom.companyIdHolder);
    let companyId;
    companyElements.forEach(companyElement => {
      let companyInnerText = companyElement.innerText;
      if(!isNaN(Number(companyInnerText))) {
        companyId = companyInnerText;
      }
    });
    if (!companyId && shouldRetry) {
      const showXpath = document.evaluate(selectors.intercom.companyInfoXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      showXpath.snapshotItem(0).click();
      setTimeout(() => {
        getOrgId(false).then(orgId => {
          resolve(orgId);
        })
      }, 0);
    } else {
      resolve({companyId});
    }
  })
}

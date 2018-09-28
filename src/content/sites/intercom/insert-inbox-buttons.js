import {selectors} from '../../config';
import {waitForSelector} from '../wait-for-selector';

const onhover = e => {
  e.target.style.opacity = .9;
}

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
      console.log(chargifyID);

      if (chargifyID) {
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
    text: '⚙ View Admin️',
    onclick: async e => {
      const orgId = await getOrgId();
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

/**
 * TODO handle multiple orgs e.g. if TW person gets added
 */
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
  buttonContainer.id = 'tw-intercom-button-container';
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

function getOrgId() {
  return new Promise(resolve => {
    const companyElements = document.querySelectorAll('[data-key="company.remote_company_id"] a');
    companyElements.forEach(companyElement => {
      let companyId = companyElement.innerText;
      if(!isNaN(Number(companyId))) {
        return resolve(companyId);
      }
    })
  })
}

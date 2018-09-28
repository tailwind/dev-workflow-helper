export const onIntercom = () => {
  return window.location.href.includes('app.intercom') && window.location.href.includes('conversations');
};

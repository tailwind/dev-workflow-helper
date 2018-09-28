export const onGithub = () => {
  return window.location.href.includes('github.com') && window.location.href.includes('pull');
};

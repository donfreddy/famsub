/**
 * Open a URL in a new tab.
 *
 * @param url The URL to open.
 */
export const openInNewTab = (url: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

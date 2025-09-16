/**
 * Copy text to the clipboard.
 *
 * @param text The text to copy.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Clipboard API failed:", err);
      return false;
    }
  } else {
    // Fallback pour Safari / vieux navigateurs
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // évite le scroll
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      console.error("execCommand fallback failed:", err);
      success = false;
    }
    document.body.removeChild(textarea);
    return success;
  }
};
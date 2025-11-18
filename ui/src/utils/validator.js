export function formatUTCToLocal(utcTime) {
  if (!utcTime) return '';

  const date = new Date(utcTime);
  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
}

export function capitalizeFirstLetter(text) {
  if (!text) return '';

  return text.charAt(0).toUpperCase() + text.slice(1);
}
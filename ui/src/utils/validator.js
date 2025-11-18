export function formatUTCToLocal(utcTime) {
  if (!utcTime) return '';

  const date = new Date(utcTime);
  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
}

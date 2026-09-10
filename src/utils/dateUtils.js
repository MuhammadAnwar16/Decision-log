// Date formatter: "2024-09-10" -> "Sept 10, 2024"
export function formatCardDate(dateString, createdAt) {
  if (!dateString && !createdAt) return '';
  const src = dateString || createdAt;
  if (typeof src === 'string' && src.includes('-')) {
    const [year, month, day] = src.split('T')[0].split('-').map(Number);
    if (year && month && day) {
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }
  const d = new Date(src);
  return isNaN(d.getTime())
    ? String(src)
    : d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
}

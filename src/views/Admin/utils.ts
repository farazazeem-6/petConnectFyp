export const formatDisplayDate = (value?: string | null): string => {
  if (!value) return '—';

  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
};

export const capitalize = (value?: string): string => {
  if (!value) return '—';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const truncateId = (id?: string, length = 10): string => {
  if (!id) return '—';
  if (id.length <= length) return id;
  return `${id.slice(0, length)}…`;
};

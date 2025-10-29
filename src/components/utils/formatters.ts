// Utility functions for formatting dates and times

export function formatDisplayDateTime(dateTime: any): string {
  if (!dateTime) return '';
  
  const now = new Date();
  const date = dateTime.toDate();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const timeStr = date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });

  if (dateOnly.getTime() === today.getTime()) {
    return `Today at ${timeStr}`;
  } else if (dateOnly.getTime() === tomorrow.getTime()) {
    return `Tomorrow at ${timeStr}`;
  }
  
  const dateStr = date.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short'
  });
  return `${dateStr} at ${timeStr}`;
}
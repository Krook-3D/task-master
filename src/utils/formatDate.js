/**
 * Format date for display in the todo app
 */
export function formatDueDate(dateString) {
  if (!dateString || !dateString.trim()) return null;

  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return null;

  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Format as "Today", "Tomorrow", or specific date
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays === -1) return 'Overdue by 1 day';
  if (diffDays < -1) return `Overdue by ${Math.abs(diffDays)} days`;

  // Format as "Month Day, Year" for future dates more than a day away
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export function formatDateForStorage(dateString) {
  if (!dateString || !dateString.trim()) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    // Store as ISO string for consistency
    return date.toISOString();
  } catch {
    return '';
  }
}

export function parseDateForComparison(dateString) {
  if (!dateString || !dateString.trim()) return null;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    
    // Convert to local timezone for comparison
    return new Date(date.toLocaleString('en-US'));
  } catch {
    return null;
  }
}

export function isOverdue(dateString) {
  const dueDate = parseDateForComparison(dateString);
  if (!dueDate) return false;
  
  const now = new Date();
  // Set to end of day for fair comparison
  now.setHours(23, 59, 59, 999);
  
  return dueDate < now;
}

export function isDueSoon(dateString) {
  const dueDate = parseDateForComparison(dateString);
  if (!dueDate) return false;
  
  const now = new Date();
  // Set to end of day for fair comparison
  now.setHours(23, 59, 59, 999);
  
  const diffDays = (dueDate - now) / (1000 * 60 * 60 * 24);
  
  // Due within next 3 days but not overdue
  return diffDays > 0 && diffDays <= 3;
}
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';

/**
 * Returns the current month and year in French format using date-fns
 */
export function getCurrentMonthYear(): string {
  return format(new Date(), 'MMMM yyyy', {locale: fr});
}

// This will output "mai 2025" for May 2025 with proper French capitalization
// If you want to capitalize the month, you can do:
export function getCurrentMonthYearCapitalized(): string {
  const formatted = format(new Date(), 'MMMM yyyy', {locale: fr});
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

// This will output "Mai 2025"

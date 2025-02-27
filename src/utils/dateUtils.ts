
/**
 * Formats a date object to a localized Turkish date string
 */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('tr-TR', options);
};

/**
 * Gets the current Hijri (Islamic) date
 * Note: This is a simplified version. For accuracy, consider using a specialized library
 */
export const getHijriDate = (): string => {
  // This is a placeholder function - in a real implementation, 
  // you would use a specialized library for Hijri calendar calculations
  // or call an API endpoint for this data
  const today = new Date();
  // Example output for demonstration purposes
  const hijriDate = `${today.getDate()} Ramazan ${1445}`;
  
  return hijriDate;
};

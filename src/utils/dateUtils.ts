import {format, parseISO, isSameDay, isToday, isYesterday, differenceInMinutes} from 'date-fns';

export const formatDate = (date: Date | string, formatStr: string = 'MMM d, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatTime = (time: string): string => {
  return time.substring(0, 8);
};

export const formatDateTime = (dateTime: Date | string): string => {
  const dateObj = typeof dateTime === 'string' ? parseISO(dateTime) : dateTime;
  return format(dateObj, 'MMM d, yyyy HH:mm');
};

export const getRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) {
    return 'Today';
  }
  
  if (isYesterday(dateObj)) {
    return 'Yesterday';
  }
  
  return formatDate(dateObj);
};

export const calculateWorkDuration = (checkIn: string, checkOut: string | null): string => {
  if (!checkOut) return '-';
  
  const checkInDate = parseISO(checkIn);
  const checkOutDate = parseISO(checkOut);
  const minutes = differenceInMinutes(checkOutDate, checkInDate);
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  return `${hours}h ${mins}m`;
};

export const isLate = (checkInTime: string, startTime: string = '09:00'): boolean => {
  const checkIn = parseISO(checkInTime);
  const start = parseISO(`2000-01-01T${startTime}`);
  return checkIn > start;
};

export const getCurrentMonth = (): string => {
  return format(new Date(), 'yyyy-MM');
};

export const getMonthName = (month: string): string => {
  const date = parseISO(`${month}-01`);
  return format(date, 'MMMM yyyy');
};

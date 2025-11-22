export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

export function isValidPositiveNumber(value: any): boolean {
  return isValidNumber(value) && value > 0;
}

export function isValidInteger(value: any): boolean {
  return Number.isInteger(value);
}

export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

export function validateRequired(value: any, fieldName: string = 'Field'): string | null {
  return isEmpty(value) ? `${fieldName} is required` : null;
}

export function validateEmail(value: string): string | null {
  if (isEmpty(value)) return 'Email is required';
  return !isValidEmail(value) ? 'Invalid email format' : null;
}

export function validatePassword(value: string): string | null {
  if (isEmpty(value)) return 'Password is required';
  return !isValidPassword(value)
    ? 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    : null;
}

export function validateRange(
  value: number,
  min: number,
  max: number,
  fieldName: string = 'Value'
): string | null {
  if (!isValidNumber(value)) return `${fieldName} must be a valid number`;
  if (value < min || value > max) {
    return `${fieldName} must be between ${min} and ${max}`;
  }
  return null;
}

export function validateMinLength(
  value: string,
  min: number,
  fieldName: string = 'Field'
): string | null {
  if (isEmpty(value)) return `${fieldName} is required`;
  return value.length < min ? `${fieldName} must be at least ${min} characters` : null;
}

export function validateMaxLength(
  value: string,
  max: number,
  fieldName: string = 'Field'
): string | null {
  return value.length > max ? `${fieldName} must be at most ${max} characters` : null;
}

export function validateMatch(value1: string, value2: string, fieldName: string = 'Fields'): string | null {
  return value1 !== value2 ? `${fieldName} do not match` : null;
}

export function isEnabled(value: any): boolean {
  return value !== 'false' && (value || value === '');
}

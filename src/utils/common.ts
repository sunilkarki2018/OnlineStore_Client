export function isStringNotNullOrEmpty(value: string) {
  return value !== null && value !== "";
}
export function isNumberNotNullOrZero(value: number | null) {
  return value !== null && value !== 0 ? true : false;
}

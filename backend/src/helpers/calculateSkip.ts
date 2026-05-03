export function calculateSkip(page: number, limit: number) {
  return (page - 1) * limit;
}

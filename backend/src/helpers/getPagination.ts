import { calculateSkip } from './calculateSkip';

export function getPagination(pageInput?: number, limitInput?: number) {
  const page = Math.max(pageInput ?? 1, 1);
  const limit = Math.min(limitInput ?? 10, 100);
  const skip = calculateSkip(page, limit);

  return {
    skip,
    take: limit,
  };
}

export type ApiResponse<T> = {
  success: true;
  data: T;
  error?: never;
  meta?: Record<string, unknown>;
};

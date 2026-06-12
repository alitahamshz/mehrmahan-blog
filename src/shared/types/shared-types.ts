export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown> | unknown[];
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  query?: QueryParams;
  timeoutMs?: number;
};
type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue | QueryValue[]>;

type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown> | unknown[];
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  query?: QueryParams;
  timeoutMs?: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const DEFAULT_TIMEOUT_MS = 15000;

export class ApiError<TData = unknown> extends Error {
  status: number;
  data: TData | null;

  constructor(message: string, status: number, data: TData | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function isJsonBody(body: ApiClientOptions["body"]) {
  return (
    body !== undefined &&
    body !== null &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof ArrayBuffer)
  );
}

function appendQueryParams(url: string, query?: QueryParams) {
  if (!query) {
    return url;
  }

  const [base, hash = ""] = url.split("#");
  const [path, search = ""] = base.split("?");
  const params = new URLSearchParams(search);

  Object.entries(query).forEach(([key, value]) => {
    const values = Array.isArray(value) ? value : [value];

    values.forEach((item) => {
      if (item !== undefined && item !== null) {
        params.append(key, String(item));
      }
    });
  });

  const queryString = params.toString();
  const nextUrl = queryString ? `${path}?${queryString}` : path;

  return hash ? `${nextUrl}#${hash}` : nextUrl;
}

function buildUrl(endpoint: string, query?: QueryParams) {
  const isAbsoluteUrl = /^https?:\/\//i.test(endpoint);
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  if (isAbsoluteUrl || !API_BASE_URL) {
    return appendQueryParams(isAbsoluteUrl ? endpoint : normalizedEndpoint, query);
  }

  return appendQueryParams(`${API_BASE_URL.replace(/\/$/, "")}${normalizedEndpoint}`, query);
}

function getErrorMessage(data: unknown, fallback: string) {
  if (data && typeof data === "object") {
    const errorData = data as { error?: unknown; message?: unknown };

    if (typeof errorData.message === "string") {
      return errorData.message;
    }

    if (typeof errorData.error === "string") {
      return errorData.error;
    }
  }

  return fallback;
}

async function parseResponse(response: Response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  return text || null;
}

async function apiClient<TResponse>(endpoint: string, options: ApiClientOptions = {}) {
  const { body, headers, query, timeoutMs = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const requestHeaders = new Headers(headers);
  const hasJsonBody = isJsonBody(body);
  const abortRequest = () => controller.abort();

  fetchOptions.signal?.addEventListener("abort", abortRequest);

  if (hasJsonBody && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(buildUrl(endpoint, query), {
      ...fetchOptions,
      body: hasJsonBody ? JSON.stringify(body) : (body as BodyInit | undefined),
      headers: requestHeaders,
      signal: controller.signal,
    });

    const data = await parseResponse(response);

    if (!response.ok) {
      throw new ApiError(
        getErrorMessage(data, "خطایی در ارتباط با سرور رخ داد."),
        response.status,
        data
      );
    }

    return data as TResponse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("زمان پاسخگویی سرور به پایان رسید.", 408);
    }

    throw new ApiError("ارتباط با سرور برقرار نشد.", 0, error);
  } finally {
    fetchOptions.signal?.removeEventListener("abort", abortRequest);
    clearTimeout(timeout);
  }
}

export const api = {
  get: <TResponse>(endpoint: string, options?: ApiClientOptions) =>
    apiClient<TResponse>(endpoint, { ...options, method: "GET" }),
  post: <TResponse>(endpoint: string, body?: ApiClientOptions["body"], options?: ApiClientOptions) =>
    apiClient<TResponse>(endpoint, { ...options, body, method: "POST" }),
  put: <TResponse>(endpoint: string, body?: ApiClientOptions["body"], options?: ApiClientOptions) =>
    apiClient<TResponse>(endpoint, { ...options, body, method: "PUT" }),
  patch: <TResponse>(endpoint: string, body?: ApiClientOptions["body"], options?: ApiClientOptions) =>
    apiClient<TResponse>(endpoint, { ...options, body, method: "PATCH" }),
  delete: <TResponse>(endpoint: string, options?: ApiClientOptions) =>
    apiClient<TResponse>(endpoint, { ...options, method: "DELETE" }),
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiRequestInit = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown>;
};

function buildUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
}

export async function apiRequest<TResponse>(
  path: string,
  init: ApiRequestInit = {},
): Promise<TResponse> {
  const headers = new Headers(init.headers);

  let body = init.body;
  if (body && !(body instanceof FormData) && typeof body !== "string") {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    body,
    cache: init.cache ?? "no-store",
    credentials: init.credentials ?? "include",
    headers,
  });

  if (!response.ok) {
    throw new ApiError(response.statusText || "Request failed", response.status);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

import type { CustomFetch } from '@doist/todoist-sdk';

/**
 * A `CustomFetch` adapter that wraps Cloudflare Workers' native `fetch` into
 * the shape expected by `@doist/todoist-sdk`.
 *
 * The SDK's {@link CustomFetch} type expects `headers` as a plain
 * `Record<string, string>`, whereas Workers' native `Response` uses the
 * `Headers` class. This adapter bridges that gap and strips the SDK's
 * non-standard `timeout` option so it is not passed to the platform fetch.
 */
export const customFetch: CustomFetch = async (url, options) => {
  const init = { ...options };
  delete init.timeout;
  const response = await fetch(url, init);
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    headers,
    text: () => response.text(),
    json: () => response.json(),
    arrayBuffer: () => response.arrayBuffer(),
  };
};

import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export interface BambooHRConfig {
  apiKey: string;
  subdomain: string;
}

function getConfig(): BambooHRConfig {
  const apiKey = process.env.BAMBOOHR_API_KEY;
  const subdomain = process.env.BAMBOOHR_SUBDOMAIN;

  if (!apiKey) {
    console.error("ERROR: BAMBOOHR_API_KEY environment variable is required.");
    process.exit(1);
  }
  if (!subdomain) {
    console.error("ERROR: BAMBOOHR_SUBDOMAIN environment variable is required.");
    process.exit(1);
  }

  return { apiKey, subdomain };
}

export class BambooHRClient {
  private http: AxiosInstance;
  readonly subdomain: string;

  constructor(config?: BambooHRConfig) {
    const { apiKey, subdomain } = config ?? getConfig();
    this.subdomain = subdomain;

    this.http = axios.create({
      baseURL: `https://api.bamboohr.com/api/gateway.php/${subdomain}/v1`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      auth: {
        username: apiKey,
        password: "x",
      },
    });
  }

  async get<T = unknown>(path: string, params?: Record<string, unknown>): Promise<T> {
    const config: AxiosRequestConfig = {};
    if (params) config.params = params;
    const res = await this.http.get<T>(path, config);
    return res.data;
  }

  async post<T = unknown>(path: string, data?: unknown): Promise<T> {
    const res = await this.http.post<T>(path, data);
    return res.data;
  }

  async put<T = unknown>(path: string, data?: unknown): Promise<T> {
    const res = await this.http.put<T>(path, data);
    return res.data;
  }

  async patch<T = unknown>(path: string, data?: unknown): Promise<T> {
    const res = await this.http.patch<T>(path, data);
    return res.data;
  }

  async delete<T = unknown>(path: string): Promise<T> {
    const res = await this.http.delete<T>(path);
    return res.data;
  }
}

export const client = new BambooHRClient();

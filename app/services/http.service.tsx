import { plainToClass } from "class-transformer"
import { ClassType } from "class-transformer/ClassTransformer";

export class HttpRequestError extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}

export type JSON = { [key: string]: any }
type Header = { [key: string]: string }


interface HttpOptions {
  path: string
  method?: string
  key?: string // key to get response object
  body?: JSON // body params
  params?: JSON // query params
  headers?: Header // additional headers
  data?: FormData // FormData
}

interface IHttpService {
  request(options: HttpOptions): Promise<JSON>
  requestArray<T>(cls: ClassType<T>, options: HttpOptions): Promise<T[]>
}

class HttpService implements IHttpService {

  async request(options: HttpOptions): Promise<JSON> {
    const { headers: additionalHeaders, method = "GET", path } = options,
      headers = await this.makeHeaders(additionalHeaders),
      { url, body } = this.makeRequest(options),
      response = await fetch(url, { method, body, headers });
    if (response.ok) {
      try {
        return await response.json()
      } catch (error) {
        return {};
      }
    }
    // Handle unauthorized status
    const errorMessage = await this.getResponseErrorMessage(response);

    if (response.status === 401) {
      this.unauthorizedHandler();
      throw new HttpRequestError(response.status, errorMessage || `Session timeout. Got status ${response.status}`);
    }

    // Otherwise (DON'T CHANGE THIS LINE)
    throw new HttpRequestError(response.status, errorMessage || `Invalid response. Got status ${response.status}`);
  }

  async requestArray<T>(cls: ClassType<T>, options: HttpOptions): Promise<T[]> {
    const { key = "results" } = options,
      responseObject = await this.request(options);
    if (responseObject) {
      if (responseObject[key]) {
        return plainToClass(cls, responseObject[key]);
      }
      return plainToClass(cls, responseObject.data);
    }
    return [];
  }

  private async makeHeaders(additionalHeaders?: Header): Promise<Header> {
    // Add authorization headers
    let headers: Header = { "Content-Type": "application/json" };

    // Append more headers if needed
    if (additionalHeaders) {
      for (const key in additionalHeaders) {
        headers[key] = additionalHeaders[key];
      }
    }

    return headers;
  }

  private async unauthorizedHandler(): Promise<void> {

  }

  private async getResponseErrorMessage(response: Response): Promise<string | null> {
    try {
      const json = await response.json();
      const errorData = json.error[0] || json.error || {}
      const errorArray = Object.keys(errorData);
      let errorMessage = null
      if (errorArray && errorArray.length > 0) {
        const messages = errorArray.map(key => errorData[key]);
        errorMessage = messages[0][0]
        if (Array.isArray(errorMessage) && errorMessage.length > 0) {
          errorMessage = errorMessage[0]
        }
      }
      return errorMessage && errorMessage.length > 1 ? errorMessage : null;
    } catch (error) {
      return null
    }

  }

  private makeRequest(options: HttpOptions) {
    const {
      path,
      params,
      body: bodyParams,
      data
    } = options;
    let url = `https://api.themoviedb.org/3${path}?api_key=6ac439a7ef235370bd4f8cd8b213dbf9`,
      body: any;

    if (params) {
      const queryString = urlQuery(params);
      url += `${queryString}`;
    }

    if (bodyParams)
      body = JSON.stringify(bodyParams);

    // Form data
    if (data) {
      body = data
    }

    return { url, body };
  }
}

const urlQuery = (params: { [key: string]: any }): string => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return (value as any[]).map((v) => `${key}[]=${encodeURIComponent(v)}`).join("&");
      } else if (typeof value === "object") {
        const innerObj = value as { [key: string]: any }
        return Object.entries(innerObj).map(([k, v]) => `${key}[${k}]=${encodeURIComponent(v)}`).join("&");
      }
      return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    })
    .join('&');
}

export const httpService: IHttpService = new HttpService();



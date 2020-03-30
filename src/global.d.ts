declare module 'query-string';
declare module 'utils/js-util';

interface UserData {
  token: string;
  email: string;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DynamicImportType = Promise<{ default: React.ComponentType<any> }>;

interface BackendFactory {
  timeout: number;
  csrf: string;
}

type IHeaders = any;

interface BackendFactoryRequest {
  timeout: number;
  headers: IHeaders;
  baseUrl?: string;
}

interface RequestClient {
  resource: string;
  Authorization?: string;
}

interface RequestGET<T = {}> {
  query?: T;
  params?: T;
}

interface RequestPOST<T> {
  data: T;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraHeaders?: any;
}

type APIResponse<T extends { data?: any }> = T & {
  success?: boolean;
  message?: string;
} & AxiosResponse<Pick<T, 'data'>>;

interface RequestAxiosGET extends RequestClient, RequestGET {}

interface RequestAxiosPOST<T = {}> extends RequestClient, RequestPOST<T> {}

type OnChangeType = (event: React.FormEvent<FormControl>) => void;

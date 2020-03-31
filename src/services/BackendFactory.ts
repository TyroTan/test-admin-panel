import queryString from 'query-string';
import { apiURL as API_URL } from 'config/constants';
import axios from 'axios';
import getCurrentSession from 'utils';

const empty = {};

const TOKEN_AUTH_PREFIX = ``;
export default class BackendFactoryClass {
  public req: BackendFactoryRequest;
  public constructor(opts = empty as BackendFactory) {
    const { timeout = 25000 } = opts;
    const headers: IHeaders = {};

    // if (csrf) {
    //   headers._csrf = csrf;
    // }

    this.req = {
      timeout,
      headers,
    };
  }

  public getRequest<R>(options: RequestAxiosGET): Promise<APIResponse<R>> {
    const { resource = '', query = null, Authorization = '' } = options;
    this.req.baseUrl = `${API_URL}/${resource}`;

    if (Authorization) {
      this.req.headers.Authorization = `${TOKEN_AUTH_PREFIX}${Authorization}`;
    }

    // console.log('osow!', query);
    const queryUrl = query ? queryString.stringify(query) : '';

    const queryUrlFull = queryUrl ? `?${queryUrl}` : '';

    // console.log(
    //   `${this.req.baseUrl}${queryUrlFull}`,
    //   'getRequest this.req',
    //   queryUrlFull,
    // );

    return axios
      .create(this.req)
      .get(`${this.req.baseUrl}${queryUrlFull}`)
      .then((res) => res.data);
  }

  public postRequest<R>(options: RequestAxiosPOST): Promise<APIResponse<R>> {
    const { resource = '', data, Authorization = '' } = options;
    this.req.baseUrl = `${API_URL}/${resource}`;
    this.req.headers['Content-Type'] = 'application/json';
    // this.req.headers.accept = 'application/json';

    if (Authorization) {
      this.req.headers.Authorization = `${TOKEN_AUTH_PREFIX}${Authorization}`;
    }

    // console.log('postRequest this.req', this.req.baseUrl, data);

    return axios
      .create(this.req)
      .post(this.req.baseUrl, data)
      .then((res) => {
        return res.data;
      });

    // return axio.create(this.req)
    // .post(this.req.baseUrl, data)
    // return axios
    // .post('https://qa.trovoai.com/api/v1/auth/login/', JSON.stringify(data), {
    // 'Content-Type': 'application/json',
    // })
    // .then(res => {
    // console.log('res.data!', res.data);
    // return res.data;
    // });
  }

  public putRequest<R>(options: RequestAxiosPOST): Promise<APIResponse<R>> {
    const { resource = '', data, Authorization = '' } = options;
    this.req.baseUrl = `${API_URL}/${resource}`;

    if (Authorization) {
      this.req.headers.Authorization = `${TOKEN_AUTH_PREFIX}${Authorization}`;
    }

    // console.log(
    //   'PUTRequest this.req',
    //   this.req,
    //   this.req.baseUrl,
    //   data,
    //   options
    // );

    return axios
      .create(this.req)
      .put(this.req.baseUrl, data)
      .then((res) => {
        return res.data;
      });
  }

  public deleteRequest<R>(options: RequestAxiosPOST): Promise<APIResponse<R>> {
    const { resource = '', Authorization = '' } = options;
    this.req.baseUrl = `${API_URL}/${resource}`;

    if (Authorization) {
      this.req.headers.Authorization = `${TOKEN_AUTH_PREFIX}${Authorization}`;
    }

    // console.log('DELETERequest this.req', this.req, this.req.baseUrl, options);

    return axios
      .create(this.req)
      .delete(this.req.baseUrl)
      .then((res) => {
        return res.data;
      });
  }

  public patchRequest<R>(options: RequestAxiosPOST): Promise<APIResponse<R>> {
    const {
      resource = '',
      data,
      extraHeaders = null,
      Authorization = '',
    } = options;
    this.req.baseUrl = `${API_URL}/${resource}`;

    if (Authorization) {
      this.req.headers.Authorization = `${TOKEN_AUTH_PREFIX}${Authorization}`;
    }
    if (extraHeaders) {
      Object.keys(extraHeaders).forEach((header) => {
        // whitelist other headers here
        if (header === 'Content-Type') {
          this.req.headers[header] = `${extraHeaders[header]}`;
        }
      });
    }

    // console.log('patchinn', this.req, data);

    return axios
      .create(this.req)
      .patch(this.req.baseUrl, data)
      .then((res) => {
        return res.data;
      });
  }

  /*
  putRequest(options = {}) {}

  optionRequest(options = {}) {}
  
  */
}

const bf = new BackendFactoryClass();

export async function sendGet<T>(
  Obj: RequestAxiosGET,
): Promise<APIResponse<T>> {
  const authed = await getCurrentSession();
  let moreOptions = Obj;
  if (authed && authed.token) {
    moreOptions = {
      ...moreOptions,
      Authorization: `${authed.token}`,
    };
  }

  return bf.getRequest(moreOptions);
}

export async function sendPost<T>(
  Obj: RequestAxiosPOST,
): Promise<APIResponse<T>> {
  const authed = await getCurrentSession();

  let moreOptions = Obj;
  if (authed && authed.token) {
    moreOptions = {
      ...moreOptions,
      Authorization: `${authed.token}`,
    };
  }

  return bf.postRequest<T>(moreOptions);
}

export async function sendNoAuthPost<T>(
  Obj: RequestAxiosPOST,
): Promise<APIResponse<T>> {
  return bf.postRequest(Obj);
}

export async function sendNoAuthGet<T>(
  Obj: RequestAxiosGET,
): Promise<APIResponse<T>> {
  return bf.getRequest(Obj);
}

export async function sendPut<T>(
  putObj: RequestAxiosPOST,
): Promise<APIResponse<T>> {
  const authed = await getCurrentSession();
  let moreOptions = putObj;
  if (authed && authed.token) {
    moreOptions = {
      ...moreOptions,
      Authorization: `${authed.token}`,
    };
  }

  return bf.putRequest<T>(moreOptions);
}

/*
export async function sendDelete<T>(delObj: {}): Promise<APIResponse<T>> {
  const authed = await getCurrentSession();
  let moreOptions = delObj;
  if (authed && authed.idToken) {
    moreOptions = {
      ...moreOptions,
      Authorization: `${authed.idToken}`,
    };
  }

  return bf.deleteRequest<T>(moreOptions);
}
*/

export function sendPatch<R>(Obj: RequestAxiosPOST): Promise<APIResponse<R>> {
  return bf.patchRequest<R>(Obj);
}

/* export function sendDelete(Obj) {
  return bf.deleteRequest(Obj);
}


export function sendOption(Obj) {
  return bf.optionRequest(Obj);
} */

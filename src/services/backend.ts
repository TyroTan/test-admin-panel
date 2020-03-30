import { sendGet, sendPost } from 'services/BackendFactory';
import { AxiosResponse } from 'axios';

const usersGET = async (opts: Request): Promise<Response> => {
  return sendGet({
    resource: `users`,
    ...opts,
  });
};

const loginPOST = async (
  opts: RequestPOST<{
    email: string;
    password: string;
  }>,
): Promise<UserData> => {
  return sendPost({
    resource: `auth/login`,
    ...opts,
  });
};

export default usersGET;
export { usersGET, loginPOST };

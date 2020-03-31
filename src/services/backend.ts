import { sendGet, sendPost } from 'services/BackendFactory';

const usersGET = async (opts: Request): Promise<Response> => {
  return sendGet({
    resource: `user/`,
    ...opts,
  });
};

const userPOST = async (
  opts: RequestPOST<{
    email: string;
    name?: string;
    password: string;
  }>,
): Promise<Response> => {
  return sendPost({
    resource: `user/`,
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
export { usersGET, userPOST, loginPOST };

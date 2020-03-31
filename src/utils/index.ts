const getCurrentSession = async (): Promise<UserData> => {
  const emptyUser = {
    token: '',
    user_id: 0,
    email: '',
    is_admin: false,
  } as UserData;
  let user = emptyUser as UserData;

  try {
    user = JSON.parse(localStorage.getItem('userData') ?? '');
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return user?.token?.length ? user : emptyUser;

  // return {
  //   // idToken: '123',
  //   // email: 'tantyrohunter@email.com',
  //   idToken: '',
  //   email: '',
  // };
};

const setCurrentSession = async (userData: UserData): Promise<void> => {
  try {
    const data =
      typeof userData === 'string' ? userData : JSON.stringify(userData);
    localStorage.setItem('userData', data);
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return;
};

const logoutAsync = async (): Promise<boolean> => {
  try {
    localStorage.setItem('userData', '');
    return true;
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return false;
};

interface AddUserForm {
  email?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
}
const validateAddUserForm = (
  dataP: AddUserForm,
  alertError: boolean,
): string | boolean => {
  const data = dataP ?? {};
  const { email = '', password = '', confirmPassword = '' } = data;
  let error = !email ? 'Email field is required.' : false;
  error = !error && !password ? 'Password field is required.' : error;
  error =
    !error && password !== confirmPassword ? 'Passwords must match.' : error;

  if (error && alertError === true) {
    alert(error);
  }

  return error;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bindThisHereHelper = (context: any, arr: string[]): void => {
  arr.forEach((varName) => {
    context[varName] = context[varName].bind(context);
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAxios422ResponseMsg = (e: any): string => {
  return e?.response?.data?.msg ?? '';
};

export default getCurrentSession;
export {
  getAxios422ResponseMsg,
  bindThisHereHelper,
  validateAddUserForm,
  getCurrentSession,
  setCurrentSession,
  logoutAsync,
};

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

export default getCurrentSession;
export { getCurrentSession, setCurrentSession, logoutAsync };

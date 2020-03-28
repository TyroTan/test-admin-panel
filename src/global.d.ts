interface UserData {
  idToken: string;
  email: string;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DynamicImportType = Promise<{ default: React.ComponentType<any> }>;

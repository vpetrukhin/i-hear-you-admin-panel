export interface LoginApiDTO {
  email: string;
  password: string;
}

interface LoginResponseApiType {
  access: string;
}

export const loginRequest = async (
  { email, password }: LoginApiDTO,
): Promise<LoginResponseApiType> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        access: "token",
      });
    }, 2000);
  });
};

export const refreshRequest = async (): Promise<LoginResponseApiType> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        access: "token",
      });
    }, 2000);
  });
};

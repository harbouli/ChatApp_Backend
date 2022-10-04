export type createUserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type validationUser = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;

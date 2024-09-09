interface User {
  user_id: number | null;
  fullname: string | null;
  email: string | null;
  password: string | null;
  type: string | null;
  retypedPassword?: string;
}

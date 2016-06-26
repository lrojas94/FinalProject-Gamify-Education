export type Session = {
  username: string;
  jwt_token: string;
  name: string;
}

export type SessionState = {
  loggedIn: boolean;
  session?: Session;
};

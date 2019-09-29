import uuid from "uuid/v4";
import Cookie from "cookie";

export function getUser(client, state) {
  let cookies = Cookie.parse(client.handshake.headers.cookie || "");

  let user;

  if (!cookies.uid || (cookies.uid && !state.users[cookies.uid])) {
    let uid = uuid();
    user = {
      uid
    };
    state.users[uid] = user;
  } else {
    user = state.users[cookies.uid];
  }

  return user;
}

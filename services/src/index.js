import path from "path";
import ip from "ip";
import Koa from "koa";
import Router from "koa-router";
import http from "http";
import socket from "socket.io";
import createStore from "./utils/createStore";
import { getUser } from "./utils/functions";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const app = new Koa();
const router = new Router();

const appStates = {
  SETUP: "setup",
  WAIT: "wait",
  START: "start",
  DISCUSS: "discuss",
  VOTE: "vote",
  DEFENSE: "defence",
  ELIMINATION: "elimination"
};

router.get("/", async (ctx, next) => {
  ctx.body = "Welcome to the home page";
});

const server = http.createServer(app.callback());
const io = socket(server);

let store = createStore({
  users: {},
  appState: appStates.SETUP,
  config: {
    numberOfPlayers: null,
    discussionTime: null,
    defenseTime: null
  }
});

let state = store.getState();

io.on("connection", function(client) {
  store.subscribe(s => {
    if (state.appState !== s.appState) {
      io.emit("appState_change", s.appState);
    }
    state = s;
  });

  let user = getUser(client, state);
  console.log("\n\na user connected with id: ", user.uid, "\n\n");

  client.emit("connection", { user, state });

  client.on("disconnect", () => {
    console.log("a user disconnected");
  });
  client.on("appState_change_manual", () => {
    console.log("called");
    store.setState({ appState: "test" });
  });

  client.on("setup_values", data => {
    gameSetup(data);
  });
});

app.use(router.routes()).use(router.allowedMethods());

server.listen(3000);

function gameSetup(config) {
  store.setState({ config });
  store.setState({ appState: appStates.WAIT });
}

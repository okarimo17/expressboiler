const Session = require("express-session");
const IN_PROD = process.env.PRODUCTION || false;
const ONE_DAY = 24 * 60 * 60 * 1000;
const LokiStore = require("connect-loki")(Session);

const {
  SESSION_SECRET = process.env.SESSION_SECRET || "ELWOUROD_CLME_SESPS",
  SESSION_NAME = "el_wouroud",
  SESSION_IDLE_TIMEOUT = ONE_DAY, //one hour
} = process.env;

const SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  resave: false,
  cookie: {
    maxAge: SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};

const fileStoreOptions = {
  path: "./server/sessions/sessions.json",
  ttl: ONE_DAY,
  logErrors: true,
};

function SessionService() {
  function initSession(app) {
    const session = Session({
      ...SESSION_OPTIONS,
      store: new LokiStore(fileStoreOptions),
    });
    app.use(session);
    return session;
  }
  return {
    initSession,
  };
}

module.exports = SessionService();

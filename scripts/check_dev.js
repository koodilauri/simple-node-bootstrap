if (!process.env.NODE_ENV) {
  require("dotenv").config();
}
if (process.env.NODE_ENV !== "development") {
  process.exit(1);
}

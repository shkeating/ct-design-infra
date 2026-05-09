const fractal = require("./fractal.config.cjs");
const logger = fractal.cli.console;

const server = fractal.web.server({
  sync: true,
});

server.on("error", (err) => logger.error(err.message));

server.start().then(() => {
  logger.success(`Fractal server is now running at ${server.url}`);
});

const fractal = require("./fractal.config.cjs");
const logger = fractal.cli.console;

// Lets parallel component-porting agents (each in its own git worktree) run their
// own Fractal instance without colliding on the default port.
const port = Number(process.env.CT_FRACTAL_PORT) || 3000;
fractal.web.set("server.port", port);

const server = fractal.web.server({
  sync: true,
});

server.on("error", (err) => logger.error(err.message));

server.start().then(() => {
  logger.success(`Fractal server is now running at ${server.url}`);
});

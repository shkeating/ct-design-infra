const fractal = require("./fractal.config.cjs");
const logger = fractal.cli.console;

// The `fractal` CLI's `build` command only auto-discovers a config file
// named exactly `fractal.config.js` in the cwd — it has no equivalent to
// lab.cjs's explicit require of our `fractal.config.cjs`, and its `build`
// subcommand doesn't accept a --config flag at all. So, same as lab.cjs,
// drive the JS API (fractal.web.builder()) directly instead of the CLI.
const builder = fractal.web.builder();

builder.on("error", (err) => logger.error(err.message));

builder
  .build()
  .then((data) => {
    const errorCount = data.errorCount || 0;
    if (errorCount > 0) {
      logger.error(`Static build finished with ${errorCount} error(s).`);
      process.exit(1);
    }
    logger.success("Static build complete.");
  })
  .catch((err) => {
    logger.error(err.message);
    process.exit(1);
  });

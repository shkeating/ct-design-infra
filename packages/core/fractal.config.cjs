const path = require("path");
const fractal = require("@frctl/fractal").create();

/* Project Title */
fractal.set("project.title", "Civic-Theme Design Infra");

/* Handlebars Integration */
fractal.components.engine("@frctl/handlebars");
fractal.components.set("ext", ".hbs");

/* Component Configuration */
fractal.components.set("path", path.join(__dirname, "src/components"));
fractal.components.set("default.preview", "@preview");

/* Documentation Configuration */
fractal.docs.set("path", path.join(__dirname, "docs"));

/* Static Assets */
// Fractal will serve your built components and tokens from /dist
fractal.web.set("static.path", path.join(__dirname, "dist"));

// Adding the tokens package to static paths
fractal.web.set("static.mount", "/");

// To serve multiple directories we can just use the standard Express approach if we were using a custom server, but for Fractal we can use static.mount. Wait, Fractal 1.x doesn't easily support multiple static paths this way without custom plugins.
// Actually, let's copy the css file or just add a mount point
// fractal.web.set('static.mount', '/');
fractal.web.set("builder.dest", path.join(__dirname, "build"));

module.exports = fractal;


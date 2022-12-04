const chokidar = require("chokidar");
const childProcess = require("child_process");
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const SRC_PATH = path.resolve(__dirname, "../");
const LAB_PATH = path.join(SRC_PATH, "_firebase-emulator-guide","index.lab.md");
const DST_PATH = path.join(SRC_PATH, 'public');
const MOD_PATH = path.join(SRC_PATH, 'node_modules');

module.exports = function main() {
  const app = express();
  app.use('/',express.static(DST_PATH));
  app.use('/',express.static(MOD_PATH));

  console.log(`Serving content from ${DST_PATH} at http://localhost:${PORT}`);

  chokidar.watch(path.join('.')).on("all", (event, path) => {
    console.log(`Detected file change (${path}), recompiling...`);
    childProcess.exec(`claat export index.lab.md`, {
      cwd: SRC_PATH,
    });
  });

  app.listen(PORT);
}

// main();

import chokidar from "chokidar";
import { spawn, exec } from "child_process";
import treeKill from "tree-kill"; // ✅ Use tree-kill

let server: ReturnType<typeof spawn> | null = null;

function logDivider() {
  console.log("\n────────────────────────────\n");
}

function startServer() {
  logDivider();
  console.log("🔍 Running type check...\n");

  exec("tsc --noEmit", (err, stdout, stderr) => {
    if (err) {
      console.log("❌ Type check failed:\n");
      console.log(stderr || stdout);
      logDivider();
      return;
    }

    console.log("✅ Type check passed. Starting Server\n");

    // Start new server
    server = spawn("npx", ["tsx", "--inspect=9229", "src/index.ts"], {
      stdio: "inherit",
      shell: true, // Required for Windows (.cmd support)
    });
  });
}

// Watch only .ts files inside src/
const watcher = chokidar.watch("./src", {
  ignored: /node_modules/,
  ignoreInitial: true,
});

watcher.on("all", (_event, _path) => {
  if (server && server.pid) {
    console.log("Killing previous server...");

    // ✅ Use tree-kill instead of server.kill
    treeKill(server.pid, "SIGKILL", (err) => {
      if (err) {
        console.warn("⚠️ Failed to kill previous server:", err.message);
      } else {
        console.log("✅ Previous server tree killed.");
      }

      server = null;

      // Wait a moment to ensure port is freed
      setTimeout(() => {
        startServer();
      }, 500); // You can reduce this from 3000ms
    });
  } else {
    startServer();
  }
});

// Graceful shutdown on Ctrl+C
process.on("SIGINT", () => {
  console.log("\n🛑 Exiting. Cleaning up...");
  if (server && server.pid) {
    treeKill(server.pid, "SIGKILL", () => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

// Initial run
startServer();

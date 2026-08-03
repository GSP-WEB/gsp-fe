// // module.exports = {
// //   apps: [
// //     {
// //       name: "fosp-fe",
// //       script: "npm",
// //       args: "start",
// //       cwd: "C:\\UniServerZ\\www\\fosp",
// //       env: {
// //         NODE_ENV: "production",
// //         PORT: 3001,
// //       },
// //     },
// //   ],
// // };

// const path = require("path");

// const APP_NAME = "fosp-fe";

// module.exports = {
//   apps: [
//     {
//       name: APP_NAME,
//       cwd: __dirname,
//       // Windows: PM2 cannot run npm.cmd as a Node script — invoke Next directly.
//       script: path.join(
//         __dirname,
//         "node_modules",
//         "next",
//         "dist",
//         "bin",
//         "next",
//       ),
//       // Bind on all interfaces so LAN clients can reach :3001
//       args: "start -p 3001 -H 0.0.0.0",
//       interpreter: "node",
//       env: {
//         NODE_ENV: "production",
//         PORT: "3001",
//         HOSTNAME: "0.0.0.0",
//         // cyod_* tables live in feedback_v2 (same DB as tbl_admin)
//         // CYOD_DB_NAME: "feedback_v2",
//         // AUTH_DB_NAME: "feedback_v2",
//       },
//       autorestart: true,
//       watch: false,
//       max_memory_restart: "1G",
//     },
//   ],
// };

const path = require("path");

const APP_NAME = "fosp-fe";

module.exports = {
  apps: [
    {
      name: APP_NAME,
      cwd: __dirname,

      // Windows: PM2 cannot run npm.cmd as a Node script — invoke Next directly.
      script: path.join(
        __dirname,
        "node_modules",
        "next",
        "dist",
        "bin",
        "next",
      ),

      // Bind on all interfaces so LAN clients can reach :3002
      args: "start -p 3002 -H 0.0.0.0",

      interpreter: "node",

      env: {
        NODE_ENV: "production",
        PORT: "3002",
        HOSTNAME: "0.0.0.0",
      },

      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};

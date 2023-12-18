import app from "@/app";
import { port } from "@/configs/config.app";
import { ServerSocket } from "@/configs/config.socket";
import http from "http";

//  ---------------------- CODE APPLY WHEN HAVE CREDENTIALS - START ---------------------

// if (process.env.NODE_ENV === "Production") {
//     const credentials = {
//         key: privateKey,
//         cert: certificate,
//         ca: ca,
//     };

//     const httpsServer = https.createServer(credentials, app);
//     new ServerSocket(httpsServer).start();

//     httpsServer.listen(port, () => {
//         console.log("[::HTTPS::] WSV start on port", port);
//     });
// } else {
//     const httpServer = http.createServer(app);
//     new ServerSocket(httpServer).start();

//     httpServer.listen(port, () => {
//         console.log("[::HTTP::] WSV start on port", port);
//     });
// }

//  ---------------------- CODE APPLY WHEN HAVE CREDENTIALS - END ----------------------

const httpServer = http.createServer(app);
new ServerSocket(httpServer).start();

httpServer.listen(port, () => {
    console.log("[::HTTP::] WSV start on port", port);
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const PORT = 4000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb://localhost:27017/tour-management-db");
        console.log("Connected to DB");
        server = app_1.default.listen(PORT, () => {
            console.log(`server is listenning on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved... Server shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("SIGINT", () => {
    console.log("SIGINT signal recieved... Server shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection detected... Server shutting down...", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (error) => {
    console.log("SIGINT signal recieved... Server shutting down...", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

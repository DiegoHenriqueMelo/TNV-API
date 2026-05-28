import { StartServer } from "./server/server.js";
import dotenv from "dotenv";
dotenv.config();

StartServer(Number(process.env.PORT));

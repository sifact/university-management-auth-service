import mongoose from "mongoose";
import { Request, Response } from "express";
import app from "./app";
import config from "./config";

async function main() {
    try {
        await mongoose.connect(config.databaseURL as string);
        console.log(`Database is connected...`);

        app.listen(config.port, () => {
            console.log(`UM server is running on ${config.port}`);
        });
    } catch (error) {
        console.log(`Failed to connect database`, error);
    }
}

main().catch((err) => console.log(err));

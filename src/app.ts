import express ,{type  Express} from "express";
import { appConfig } from "./config/readers/config.js";
import helmet from "helmet";
import cors from "cors"
import {appLogger} from "./core/appLogger.js";
class App{
    private readonly app :Express;
    constructor(){
        this.app=express()
    }
    public init(){
        this.listen()
    }

    private listen():void{
        this.app.listen(appConfig.app.port,async()=>{
            appLogger.info("SERVER",`App is running on port ${appConfig.app.port}`)
        })
    }
}
new App().init()

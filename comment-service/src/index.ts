import express, { Request, Response } from "express"
import {connect, JetStreamClient} from "nats"
import { natsClient } from "./configs/nats.config";
import { postCreatedListener } from "./events/listener";
const app = express();

app.use(express.json());

export let js:JetStreamClient;

app.post("/api/create",(req:Request,res:Response)=>{
    const {content} =req.body;
    
})


async function runServer(){
    try {
        const PORT = 3000;
        const nc = await natsClient();
        js = nc.jetstream();
        await postCreatedListener();
        app.listen(PORT,()=>{
            console.log(`server is listening on Port:${PORT}`);
        })
    } catch (error) {
        console.error(error);
    }
}

 runServer();


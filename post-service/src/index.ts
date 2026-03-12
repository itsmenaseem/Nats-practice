import express, { Request, Response } from "express"
import {JetStreamClient,StringCodec} from "nats"
import { natsClient } from "./configs/nats.config";
import {randomBytes} from "crypto"
const app = express();
const sc = StringCodec()
app.use(express.json());

let js:JetStreamClient;
const posts = [];
app.post("/api/create",async (req:Request,res:Response)=>{
    const {content} =req.body;
    const postId = randomBytes(4).toString("hex");
    posts.push({postId,content});
    const payload = sc.encode(JSON.stringify({postId,content}));
    await js.publish("post.created",payload);
    return res.send({postId,content});
})


async function runServer(){
    try {
        const PORT = 3000;
        const nc = await natsClient();
        js = nc.jetstream();
        app.listen(PORT,()=>{
            console.log(`server is listening on Port:${PORT}`);
        })
    } catch (error) {
        console.error(error);
    }
}

 runServer();
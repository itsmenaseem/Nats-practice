import express, { Request, Response } from "express"
import {connect, JetStreamClient} from "nats"
import { natsClient } from "./configs/nats.config";
import { postCreatedListener } from "./events/listener";
import { comments } from "./store/comments";
const app = express();

app.use(express.json());

export let js:JetStreamClient;

app.post("/api/create",(req:Request,res:Response)=>{
   const {postId,content} = req.body;
   const post = comments.find(com=>com.postId == postId);
   if(!post)return res.send("Post not found");
   post.comments.push(content);
   res.send("Comment created!");
})

app.get("/api/comments/:postId",(req:Request,res:Response)=>{
    const postId = req.params;
     const post = comments.find(com=>com.postId == postId.toString());
   if(!post)return res.send("Post not found");
   res.send(post);
})

async function runServer(){
    try {
        const PORT = 3001;
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


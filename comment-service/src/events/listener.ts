import { StringCodec } from "nats";
import { js } from "..";
import { comments } from "../store/comments";
import { PostCreated } from "../definitions/post.created";
import { Streams } from "../definitions/streams";
import { Consumers } from "../definitions/consumers";
const sc = StringCodec();

export async function postCreatedListener(){

    const consumer = await js.consumers.get(
        Streams.Post,
        Consumers.PostService
    );

    const messages = await consumer.consume();

    console.log("Listening for post.created events");

    for await (const msg of messages){

        const data:PostCreated = JSON.parse(
            sc.decode(msg.data)
        );
        comments.push({postId:data.postId,comments:[]});
        console.log("Event received:", data);

        msg.ack();
    }
}
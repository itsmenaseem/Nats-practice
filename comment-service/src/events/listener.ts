import { StringCodec } from "nats";
import { js } from "..";
import { comments } from "../store/comments";
const sc = StringCodec();

export async function postCreatedListener(){

    const consumer = await js.consumers.get(
        "POST",
        "post-service"
    );

    const messages = await consumer.consume();

    console.log("Listening for post.created events");

    for await (const msg of messages){

        const data = JSON.parse(
            sc.decode(msg.data)
        );
        comments.push({postId:data.postId,comments:[data.content]});
        console.log("Event received:", data);

        msg.ack();
    }
}
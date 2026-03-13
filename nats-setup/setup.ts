import {AckPolicy, connect} from "nats";
import {  Streams } from "./definitions/streams";
import {  Consumers } from "./definitions/consumers";


async function init(){
    const nc = await connect({servers:"nats://nats-srv:4222"});
    const jsm = await nc.jetstreamManager();

    // streams (persistance storage) 
    await jsm.streams.add({
        name:Streams.Post,
        subjects:["post.*"]
    })
    await jsm.streams.add({
        name: Streams.Comment,
        subjects:["comment.*"]
    })
    //  consumers 
    await jsm.consumers.add(Streams.Post,{
        durable_name:Consumers.PostService,
        ack_policy:AckPolicy.Explicit,
        filter_subject:"post.*"
    })
    await jsm.consumers.add(Streams.Comment,{
        durable_name: Consumers.CommentService,
        ack_policy:AckPolicy.Explicit,
        filter_subject:"comment.*"
    })
    console.log("stream and consumer created !!");
    nc.close();
}

init();
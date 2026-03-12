import {AckPolicy, connect} from "nats";


async function init(){
    const nc = await connect({servers:"nats://nats-srv:4222"});
    const jsm = await nc.jetstreamManager();

    // create stream (persistance storage) for all event related to post
    await jsm.streams.add({
        name:"POST",
        subjects:["post.created"]
    })
    // create consumer for stream POST
    await jsm.consumers.add("POST",{
        durable_name:"post-service",
        ack_policy:AckPolicy.Explicit,
        filter_subject:"post.*"
    })
    console.log("stream and consumer created !!");
    nc.close();
}

init();
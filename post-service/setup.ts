import { AckPolicy, connect } from "nats";


async function init() {
    const nc = await connect({ servers: "nats://localhost:3000" });
    const jsm = await nc.jetstreamManager();

    await jsm.streams.add({
        name: "POST",
        subjects: ["post.*"]
    });

    await jsm.consumers.add("POST",{
        durable_name:"post-service",
        ack_policy:AckPolicy.Explicit,
        filter_subject:"post.*"
    });

    console.log("stream and consumer created !!");
    await nc.close();
}

init();
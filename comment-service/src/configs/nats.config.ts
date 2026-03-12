import { connect } from "nats";

async function natsClient(){
    const stan = await connect({servers:"nats://nats-srv:4222"});
    return stan;
}

export {natsClient};
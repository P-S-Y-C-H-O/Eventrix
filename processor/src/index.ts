import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Kafka } from "kafkajs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const client = new PrismaClient({ adapter });

const TOPIC_NAME="zap-events"
const kafka=new Kafka({
    clientId:'outbox-pattern',
    brokers:['localhost:9092']
})
async function main(){
    const producer=kafka.producer();
    await producer.connect();
    while(1){
        const pendingRows= await client.zapRunOutbox.findMany({
            where :{},
            take: 10
        })
        producer.send({
            topic:TOPIC_NAME,
            messages:pendingRows.map(r=>{
                    return {
                        value: r.zapRunId
                    }
                })
        })
    }
}

main();
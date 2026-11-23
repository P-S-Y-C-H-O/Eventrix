import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "zapier-app",
    brokers: ["localhost:9092"],
});

export const producer = kafka.producer();

export const workerConsumer = kafka.consumer({
    groupId: "zap-execution-workers",
});
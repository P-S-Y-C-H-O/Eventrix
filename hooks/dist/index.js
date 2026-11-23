import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const client = new PrismaClient({ adapter });
const app = express();
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    //store the trigger in the DB
    await client.$transaction(async (tx) => {
        const run = await client.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body,
            }
        });
        await client.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        });
    });
    //push it on to the queue (kafka/redis)
});
app.listen(3000);
//# sourceMappingURL=index.js.map
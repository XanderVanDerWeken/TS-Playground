import amqp from 'amqplib';
import type { UserCreated } from '@app/core';

async function main() {
  const conn = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "admin",
    password: "admin"
  });
  const channel = await conn.createChannel();

  const queue = "users";
  await channel.assertQueue(queue);

  channel.consume(queue, msg => {
    if (!msg) return;

    const event = JSON.parse(msg.content.toString()) as UserCreated;

    if (event.type === "user.created") {
      console.log("User created: ", event.payload.user);
    }

    channel.ack(msg);
  });
}

main();

import amqp from 'amqplib';
import type { UserCreated } from '@app/core';

async function main() {
  //const conn = await amqp.connect("amqp://localhost:5672", );
  const conn = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "admin",
    password: "admin"
  });
  const channel = await conn.createChannel();

  const queue = "users";
  await channel.assertQueue(queue);

  const event: UserCreated = {
    type: "user.created",
    payload: {
      user: {
        id: 1,
        email: "some@email.com"
      }
    }
  };

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(event)));
  console.log("User Created sent");
}

main();

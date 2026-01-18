import amqp from 'amqplib';
import { UserCreatedSchema } from './schemas/userCreated';

async function main() {
  const conn = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "admin",
    password: "admin"
  });
  const channel = await conn.createChannel();

  const exchange = "user.events";
  const queue = "users";

  await channel.assertExchange(exchange, "fanout", { durable: true });
  await channel.assertQueue(queue);

  await channel.bindQueue(queue, exchange, "");

  channel.consume(queue, msg => {
    if (!msg) return;

    const parsed = UserCreatedSchema.safeParse(
      JSON.parse(msg.content.toString())
    );

    if (!parsed.success) {
      console.error("Invalid message", parsed.error);
      channel.nack(msg, false, false);
      return;
    }

    const event = parsed.data;
    console.log("User created: ", event.payload.user);
    channel.ack(msg);
  })
}

main();

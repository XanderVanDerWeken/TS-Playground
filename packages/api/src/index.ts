import amqp from 'amqplib';
import { randomUUID } from 'crypto';
import type { UserCreated } from '@app/core';
import Fastify from 'fastify';
import { CreateUserSchema } from './schemas/createUser';

const server = Fastify({ logger: true });

async function main() {
  const conn = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "admin",
    password: "admin"
  });
  const channel = await conn.createChannel();

  const exchange = "user.events";
  await channel.assertExchange(exchange, "fanout", {
    durable: true,
  });

  server.post('/users', async (request, reply) => {
    const parsed = CreateUserSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send(parsed.error);
    }

    const user = {
      id: -1,
      email: parsed.data.email,
    };

    const event: UserCreated = {
      id: randomUUID().toString(),
      type: "user.created",
      timestamp: new Date().toISOString(),
      payload: {
        user: user,
      }
    };

    channel.publish(
      exchange,
      "",
      Buffer.from(JSON.stringify(event)),
      { persistent: true });

    return reply.status(201).send(user);
  });

  await server.listen({
    port: 3000,
  })
}

main();

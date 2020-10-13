import express from 'express';
import { Kafka, logLevel } from 'kafkajs';

import routes from './routes';

const app = express();

/**
 * Faz conexão com o Kafka
 */
const kafka = new Kafka({
  clientId: 'trilha',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 100,
    retries:8
  },
});
 
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'chat-group-receiver' })

/**
 * Disponibiliza o producer para todas rotas
 */
app.use((req, res, next) => {
  req.producer = producer;

  return next();
})

/**
 * Cadastra as rotas da aplicação
 */
app.use(routes);

async function run() {
  await producer.connect()
  await consumer.connect()

  await consumer.subscribe({ topic: 'chat' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Resposta', String(message.value));
    },
  });

  app.listen(3333);
}

run().catch(console.error)


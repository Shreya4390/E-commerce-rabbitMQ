const amqplib = require('amqplib');
const express = require('express');

const app = express();

app.use(express.json());

const PORT = 9000

let channel, connection;

connect()

async function connect() {
  try {
    const amqpServer = 'amqps://snadkezc:c6U-9h0F1m4WJVJw6DKhvzzgbKmYopZP@puffin.rmq2.cloudamqp.com/snadkezc';
    // Create amqp connection and is there any error then exit with error.
    connection = await amqplib.connect(amqpServer)
    // To send, we must declare a queue for us to send to; then we can publish a message to the queue
    channel = await connection.createChannel()
    await channel.consume('order', (data) => {
      console.log(`Received ${Buffer.from(data.content)}`)
	    // channel.ack(Buffer.from(data.content));
    })
  } catch (error) {
    console.log(error)
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Not found')
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});

const amqplib = require('amqplib');
const express = require('express');

const app = express()

app.use(express.json())

const PORT = 9005

let channel, connection;

connect()

async function connect() {
  try {
    const amqpServer = '';
    // Create amqp connection and is there any error then exit with error.
    connection = await amqplib.connect(amqpServer)
    // To send, we must declare a queue for us to send to; then we can publish a message to the queue
    channel = await connection.createChannel();
    // Assert queue to create order in queue if not exist.
    await channel.assertQueue('order')
  } catch (error) {
    console.log(error)
  }
}

app.post('/orders', (req, res) => {
  const data = req.body

  channel.sendToQueue(
    'order',
    Buffer.from(
      JSON.stringify({
        ...data,
        // date: new Date(),
      }),
    ),
  )

  res.send('Order submitted')
})

app.get('*', (req, res) => {
  res.status(404).send('Not found')
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

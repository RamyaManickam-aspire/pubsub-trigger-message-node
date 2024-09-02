// server.js

const express = require("express");
const { PubSub } = require("@google-cloud/pubsub");
var cors = require("cors");
const app = express();
const pubSubClient = new PubSub({ projectId: "gcp-learning-433309" });
const topicName = "angular-node-message"; // Replace with your topic name
app.use(cors());
app.use(express.json());

app.post("/publish", async (req, res) => {
  try {
    const message = req.body.message || "Hello, World!";
    const dataBuffer = Buffer.from(message);

    await pubSubClient.topic(topicName).publishMessage({ data: dataBuffer });

    res
      .status(200)
      .send({ message: "Message published to Pub/Sub successfully!" });
  } catch (error) {
    console.error("Error publishing message to Pub/Sub:", error);
    res.status(500).send({ error: "Failed to publish message to Pub/Sub" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

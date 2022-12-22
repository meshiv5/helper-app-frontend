import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
});

export default async function handler(req, res) {
  const { channel, message, sender } = req.body;
  const response = await pusher.trigger(channel, "chat-event", {
    message,
    sender,
  });

  res.json({ message: "completed", response: response });
}

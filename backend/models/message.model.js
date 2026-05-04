import Message from "../schema/message.schema.js"; 
import connectMongo from "../config/mongodb.js";

await connectMongo();

export const getMessagesByAds = async (ads_id) => {
  try {
    const messages = await Message.find({ ads_id });
    return messages;
  } catch (error) {
    console.error("erreur getMessagesByAds : ", error);
    throw error;
  }
};

export const findConversation = async (ads_id, sender_id, receiver_id) => {
  try {
    const messages = await Message.find({
      ads_id,
      $or: [
        { sender_id, receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id },
      ],
    });
    return messages;
  } catch (error) {
    console.error("erreur findConversation : ", error);
    throw error;
  }
};

export const createMessage = async ({
  ads_id,
  sender_id,
  receiver_id,
  content,
}) => {
  try {
    const message = await Message.create({
      ads_id,
      sender_id,
      receiver_id,
      content,
    });
    return message;
  } catch (error) {
    console.error("erreur createMessage : ", error);
    throw error;
  }
};

export const addmessage = async ({ ads_id, sender_id, receiver_id, content }) => {
  try {
    return await Message.findByIdAndUpdate(
      { ads_id, sender_id, receiver_id},
      { $push: { content } },
      { new: true }
    )
  } catch (error) {
    console.error("erreur addmessage : ", error);
    throw error;
  }
}

//export const addReaction = async ({})

export const deleteMessage = async (id) => {
  try {
    const result = await Message.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.error("erreur deleteMessage : ", error);
    throw error;
  }
};

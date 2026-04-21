import {
  getMessagesByAds,
  findConversation,
  createMessage,
  deleteMessage,
} from "../models/message.model.js";
import Message from "../schema/message.schema.js";

// messages d'une annonce
export const getMessages = async (req, res) => {
  try {
    const messages = await getMessagesByAds(Number(req.params.ads_id));
    res.json(messages);
  } catch (error) {
    console.error("Erreur dans getMessages : ", error);
    res.status(500).json({ message: "Erreur serveur getMessages" });
  }
};

//conversation entre 2 users
export const getConversation = async (req, res) => {
  const { ads_id, sender_id, receiver_id } = req.params;
  try {
    const messages = await findConversation(
      Number(ads_id),
      Number(sender_id),
      Number(receiver_id),
    );
    res.json(messages);
  } catch (error) {
    console.error("Erreur dans getConversation : ", error);
    res.status(500).json({ message: "Erreur serveur getConversation" });
  }
};

//envoyer un message
export const sendMessage = async (req, res) => {
  try {
    const { ads_id, sender_id, receiver_id, content } = req.body;

    const message = await createMessage({
      ads_id,
      sender_id,
      receiver_id,
      content,
    });
    res.status(201).json({ message: "Message envoyé !", data: message });
  } catch (error) {
    console.error("Erreur dans sendMessage : ", error);
    res.status(500).json({ message: "Erreur serveur sendMessage" , error: error.message});
  }
};

//supprimer un message
export const removeMessage = async (req, res) => {
  try {
    const result = await deleteMessage(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Message introuvable" });
    }
    res.json({ message: "Message supprimé !" });
  } catch (error) {
    console.error("Erreur dans removeMessage : ", error);
    res.status(500).json({ message: "Erreur serveur removeMessage" });
  }
};

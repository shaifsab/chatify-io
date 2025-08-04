const { emailValidator } = require("../helpers/validators");
const conversationSchema = require("../models/conversationSchema");
const userSchema = require("../models/userSchema");

// Create Conversation Controller 
const createConversation = async (req, res) => {
  try { 
    const { participentEmail } = req.body;
 
    if (!participentEmail) {
      return res.status(400).send({ message: "Participant email is required!" });
    }
    if (emailValidator(participentEmail)) {
      return res.status(400).send({ message: "Email is not valid!" });
    }
    if (participentEmail === req.user.email) {
      return res.status(400).send({ message: "Cannot start a conversation with yourself!" });
    }
 
    const participentData = await userSchema.findOne({ email: participentEmail });
 
    if (!participentData) {
      return res.status(400).send({ message: "User not found!" });
    }
 
    const existingParticipent = await conversationSchema.findOne({
      $or: [
        { creator: req.user.id, participent: participentData._id },
        { participent: req.user.id, creator: participentData._id }
      ]
    });

    if (existingParticipent) {
      return res.status(400).send({ message: "Conversation already exists!" });
    }
 
    const conversation = new conversationSchema({
      creator: req.user.id,
      participent: participentData._id,
    });
 
    await conversation.save();
 
    const populatedConversation = await conversation.populate([
      { path: 'creator', select: 'fullName avatar email' },
      { path: 'participent', select: 'fullName avatar email' },
      { path: 'lastMessage' }
    ]);
 
    res.status(200).send(populatedConversation);
  } catch (error) { 
    res.status(500).send({ message: "Server error!" });
  }
};

// Conversation List Controller 
const conversationList = async (req, res) => {
  try { 
    const conversation = await conversationSchema
      .find({
        $or: [{ creator: req.user.id }, { participent: req.user.id }]
      })
      .populate("creator", "fullName avatar email")
      .populate("participent", "fullName avatar email")
      .populate("lastMessage")
      .sort({ 'updatedAt': -1 }); 
 
    if (!conversation) {
      return res.status(400).send({ message: "No conversations found!" });
    }
 
    res.status(200).send(conversation);
  } catch (error) { 
    res.status(500).send({ message: "Server error!" });
  }
};
 
module.exports = { createConversation, conversationList };
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const voteHandler = (io) => async (req, res) => {
  const { poll_id, option_id } = req.params;

  try {
    const option = await prisma.pollOption.update({
      where: { id: parseInt(option_id) },
      data: { votes: { increment: 1 } },
    });

    req.io.emit("votesUpdated", { optionId: option.id, votes: option.votes });//realtime update for clients
    res.json(option);
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar o voto" });
  }
};

module.exports = voteHandler;

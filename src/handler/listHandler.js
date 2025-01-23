const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listHandler = async (req, res) => {
  try {
    const { status } = req.query;

    const polls = await prisma.poll.findMany({
      include: { options: true },
    });

    //polls status
    const now = new Date();
    const enrichedPolls = polls.map((poll) => {
      let pollStatus = "não iniciada";
      if (now >= poll.startDate && now <= poll.endDate) {
        pollStatus = "em andamento";
      } else if (now > poll.endDate) {
        pollStatus = "finalizada";
      }

      return { ...poll, status: pollStatus };
    });

    //filter by status
    const filteredPolls = status
      ? enrichedPolls.filter((poll) => poll.status === status)
      : enrichedPolls;

    res.json(filteredPolls);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar enquetes." });
  }
};

module.exports = listHandler;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateHandler = async (req, res) => {
    const { title, startDate, endDate, options } = req.body;
    if (options.length < 3) {
      return res.status(400).json({ error: "Deve haver no mínimo 3 opções" });
    }
  
    const poll = await prisma.poll.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        options: {
          deleteMany: {},
          create: options.map(option => ({ text: option })),
        },
      },
    });
  
    res.json(poll);
  };

  module.exports = updateHandler;
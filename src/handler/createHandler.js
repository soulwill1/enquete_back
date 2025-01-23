const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createHandler = async (req, res) => {
  const { title, startDate, endDate, options } = req.body;
  if (options.length < 3) {
    return res.status(400).json({ error: "Deve haver no mínimo 3 opções" });
  }

  const poll = await prisma.poll.create({
    data: {
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      options: {
        create: options.map(option => ({ text: option })),
      },
    },
  });

  res.status(201).json(poll);
};

module.exports = createHandler;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const deleteHandler = async (req, res) => {
  await prisma.poll.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).end();
};

module.exports = deleteHandler;
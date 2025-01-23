const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getByIdHandler = async (req, res) => {
  const { id } = req.params;  //Bundle ID from URL Settings

  try {
    //find by id
    const poll = await prisma.poll.findUnique({
      where: { id: parseInt(id) },  //id parse to integer
      include: { options: true },   //return the options
    });

    //Return error 404
    if (!poll) {
      return res.status(404).json({ error: "Enquete não encontrada." });
    } 
    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getByIdHandler;

const express = require("express");
const createHandler = require("../handler/createHandler");
const listHandler = require("../handler/listHandler");
const updateHandler = require("../handler/updatePoll");
const deleteHandler = require("../handler/deleteHandler");
const voteHandler = require("../handler/voteHandler");
const getByIdHandler = require("../handler/getByIdHandler");

const createRouter = (io) => {
    const router = express.Router();
    //create - use /api/v1/polls
    router.post("/", createHandler);

    //list - use /api/v1/polls
    router.get("/", listHandler);

    //get by id - use /api/v1/polls/id
    router.get("/:id", getByIdHandler);

    //update by id - use /api/v1/polls/id
    router.put("/:id", updateHandler);

    //delete by id - use /api/v1/polls/id
    router.delete("/:id", deleteHandler);

    //vote - use /api/v1/polls/poll_id/options/option_id/vote
    router.post("/:poll_id/options/:option_id/vote", voteHandler(io));

    return router;
}

module.exports = createRouter;

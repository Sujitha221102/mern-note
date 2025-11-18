const express = require("express");
const router = express.Router();
const { getNotes,createNotes,updateNotes,deleteNotes,getDetailsNotes } = require('../controllers/notesController');

router.get("/", getNotes);
router.post("/", createNotes);
router.put("/:id",updateNotes);
router.delete("/:id", deleteNotes);
router.get("/:id", getDetailsNotes);

module.exports = router;

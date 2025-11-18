const { Notes } = require("../models/NoteSchema");

async function getNotes(req, res) {
  try {
    const note = await Notes.find();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getDetailsNotes(req, res) {
  try {
    const note = await Notes.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createNotes(req, res) {
  try {
    const { title, description } = req.body; 
    const newNote = new Notes({ title, description });
    await newNote.save();
    res.status(201).json({ message: "Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateNotes(req, res) {
  try {
    const { title, description } = req.body; 
    const updatedNote=await Notes.findByIdAndUpdate(req.params.id,{title,description},{new:true})
    if(!updatedNote)return res.status(404).json({message:"Note not found"})
    res.status(200).json(updatedNote)
  }  catch (error) {
    console.log(error,"error")
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteNotes(req, res) {
  try {
    const deleteNote=await Notes.findByIdAndDelete(req.params.id)
    if(!deleteNote)return res.status(404).json({message:"Note not found"})
    res.status(200).json({message:"Deleted Successfully"})
  }  catch (error) {
    console.log(error,"error")
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { getNotes, createNotes, updateNotes, deleteNotes, getDetailsNotes };

import React, { useEffect, useState } from "react";
import { Typography, Button } from "antd";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { formatUTCToLocal } from "../utils/validator";
import CreateNotes from "./CreateNotes";
import DeleteNote from "./DeleteNote";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createNote, setCreateNote] = useState(false);
  const [updateNote, setUpdateNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteNote, setDeleteNote] = useState({
    open: false,
    id: "",
    title:""
  });

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/api/notes");
      setNotes(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching notes");
      console.log(error.response);
      setLoading(false);
    }
  };

  function handleDelete(note) {
    setDeleteNote({
      open: true,
      id: note?._id,
      title:note?.title
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="bg-gray-600 w-full h-screen p-4">
      <div className="flex flex-row justify-between items-center py-3">
        <Typography className="text-white font-semibold text-3xl">
          ThinkBoard
        </Typography>
        <Button
          onClick={() => {
            setCreateNote(true);
            setUpdateNote(false);
          }}
        >
          + New Note
        </Button>
      </div>
      <div className="flex flex-row gap-2">
        {loading && (
          <div className="text-center text-primary py-10 text-white">
            Loading notes...
          </div>
        )}
        <div className="flex flex-wrap justify-between gap-4">
          {notes.length > 0 &&
            notes.map((note) => (
              <div className="w-[300px] h-[150px] border-x-[1px] border-b-[1px] border-t-[3px] border-solid border-gray-100 border-t-green-300 shadow-md rounded-md  px-6 py-4">
                <div className="flex flex-col justify-start text-gray-100">
                  <div className="pb-4">
                    <Typography className="text-gray-100 text-xl font-medium">
                      {note?.title ?? "-"}
                    </Typography>
                    <p>{note?.description ?? "-"}</p>
                  </div>
                  <div className="flex flex-row justify-between items-center gap-5 w-full">
                    <p>{formatUTCToLocal(note?.createdAt) ?? "-"}</p>
                    <div className="flex flex-row justify-end items-center gap-x-1.5">
                      <FaRegEdit
                        className="text-white cursor-pointer"
                        onClick={() => {
                          setSelectedNote(note);
                          setCreateNote(true);
                          setUpdateNote(true);
                        }}
                      />
                      <RiDeleteBin5Line
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(note)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {createNote && (
        <CreateNotes
          selectedNote={selectedNote}
          updateNote={updateNote}
          setNotes={setNotes}
          setCreateNote={setCreateNote}
          createNote={createNote}
          fetchNotes={fetchNotes}
        />
      )}
      {deleteNote?.open&&<DeleteNote deleteNote={deleteNote} setDeleteNote={setDeleteNote} fetchNotes={fetchNotes}/>}
    </div>
  );
};

export default Home;

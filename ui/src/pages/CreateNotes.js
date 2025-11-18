import { Button, Input, message, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateNotes = ({
  selectedNote,
  updateNote,
  setNotes,
  setCreateNote,
  createNote,
  fetchNotes,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  function handleCancel() {
    setCreateNote(false);
    setTitle("");
    setDescription("");
  }
  async function handleCreate() {
    setLoading(true);
    try {
      const data = {
        title: title,
        description: description,
      };

      const response = await axios.post(
        "http://localhost:5001/api/notes",
        data
      );
      setLoading(false);
      setNotes(response);
      messageApi.success("Created Successfully!");
      setCreateNote(false);
      fetchNotes();
    } catch (err) {
      messageApi.error(err.message);
      setLoading(false);
    }
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      const data = {
        title: title,
        description: description,
      };

      const response = await axios.put(
        `http://localhost:5001/api/notes/${selectedNote?._id}`,
        data
      );
      setNotes(response);
      setCreateNote(false);
      messageApi.success("Updated Successfully!");
      setLoading(false);
      fetchNotes();
    } catch (err) {
      messageApi.error(err.response?.data?.message);
      setLoading(false);
      setCreateNote(false);
    }
  }
  useEffect(() => {
    if (updateNote && selectedNote) {
      setTitle(selectedNote.title || "");
      setDescription(selectedNote.description || "");
    }
  }, [updateNote, selectedNote]);

  return (
    <>
      {contextHolder}
      <Modal
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              className="bg-blue-600"
              type="primary"
              onClick={updateNote ? handleUpdate : handleCreate}
              loading={loading}
              disabled={loading || !title || !description}
            >
              {updateNote ? "Update" : "Create"}
            </Button>
          </div>
        }
        closable={false}
        open={createNote}
        maskClosable={false}
      >
        <p className="w-full flex justify-start gap-2 items-center text-xl font-bold text-gray-800">
          {updateNote ? "Update Note" : "Create Note"}
        </p>
        <div className="flex flex-col w-full mt-2">
          <Typography className="text-gray-800 font-semibold">
            Title <span className="text-red-500">*</span>
          </Typography>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
        </div>
        <div className="flex flex-col w-full mt-3">
          <Typography className="text-gray-800 font-semibold">
            Description <span className="text-red-500">*</span>
          </Typography>
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Input.TextArea>
        </div>
      </Modal>
    </>
  );
};
export default CreateNotes;

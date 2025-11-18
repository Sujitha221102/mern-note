import { Button, Input, message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

const DeleteNote = ({ deleteNote, setDeleteNote, fetchNotes }) => {
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  async function handleDelete() {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/notes/${deleteNote?.id}`
      );
      messageApi.success(response?.data?.message||"deleted");
      setDeleteNote({ open: false, title: "", id: "" });
      setLoading(false);
      await fetchNotes();
    } catch (err) {
      messageApi.error(err?.response?.data?.message);
      setLoading(false);
      setDeleteNote({ open: false, title: "", id: "" });
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={() => setDeleteNote({ open: false, id: "" })}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600"
              type="primary"
              onClick={handleDelete}
              loading={loading}
              disabled={loading || confirm !== deleteNote?.title}
            >
              {"Delete"}
            </Button>
          </div>
        }
        className="flex flex-col gap-1"
        closable={false}
        open={deleteNote?.open}
        maskClosable={false}
      >
        <span>Are you sure, You want to delete this </span>
        <span className="font-medium">{`${deleteNote?.title}`}</span>
        <span> note from your Project?</span>
        <p>if yes,then type Title of the Note</p>
        <Input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        ></Input>
      </Modal>
    </>
  );
};

export default DeleteNote;

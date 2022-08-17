import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
} from "../../../config/redux/action";
import "./Dashboard.scss";

function Dashboard() {
  const [formInput, setFormInput] = useState({
    title: "",
    content: "",
    date: "",
    textButton: "SIMPAN",
    noteId: "",
  });

  const dispacth = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("dataUser"));
    // console.log(data);
    dispacth(getDataFromAPI(data.uid));
  }, []);

  const handleInput = (e, type) => {
    setFormInput({
      ...formInput,
      [type]: e.target.value,
      date: new Date().getTime(),
    });
  };

  const handleSubmit = () => {
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));

    const data = {
      ...formInput,
      userId: dataUser.uid,
    };

    if (formInput.textButton === "SIMPAN") {
      dispacth(addDataToAPI(data));
      handleCancel();
    } else {
      data.noteId = formInput.noteId;
      dispacth(updateDataAPI(data));
    }
  };

  const handleUpdate = (note) => {
    // console.log(note);
    setFormInput({
      title: note.data.title,
      content: note.data.content,
      textButton: "UPDATE",
      noteId: note.id,
    });
  };

  const handleCancel = () => {
    setFormInput({
      title: "",
      content: "",
      textButton: "SIMPAN",
    });
  };

  // console.log("data notes redux:", state.notes);

  return (
    <div className="container">
      <div className="input-form">
        <input
          type="text"
          placeholder="title"
          className="input-title"
          value={formInput.title}
          onChange={(e) => {
            handleInput(e, "title");
          }}
        />
        <textarea
          placeholder="content"
          className="input-content"
          value={formInput.content}
          onChange={(e) => {
            handleInput(e, "content");
          }}
        ></textarea>
        <div className="button-wrapper">
          {formInput.textButton === "UPDATE" ? (
            <button className="save-btn cancel" onClick={handleCancel}>
              CANCEL
            </button>
          ) : (
            <div />
          )}
          <button className="save-btn" onClick={handleSubmit}>
            {formInput.textButton}
          </button>
        </div>
      </div>
      <hr />

      {state.notes.length > 0 ? (
        <>
          {state.notes.map((note) => {
            return (
              <div
                className="card-content"
                key={note.id}
                onClick={() => handleUpdate(note)}
              >
                <p className="title">{note.data.title}</p>
                <p className="date">{note.data.date}</p>
                <p className="content">{note.data.content}</p>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}

export default Dashboard;

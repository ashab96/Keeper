import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components//Header";
import Footer from "./components//Footer";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState([]);
  const [showModel, setShowModel] = useState(0);
  const URL = "https://guarded-lake-02238.herokuapp.com";  //to  run locally use "http://localhost:5000"

  const getModel = (id) => {
    setShowModel(id);
  };

  // Get list from database on page load
  useEffect(() => {
    getList();
  }, []);

  // READ
  const getList = () => {
    axios
      .get(URL + "/notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // DELETE
  const deleteNote = (id) => {
    axios.delete(URL + `/notes/delete/${id}`).then(() => {
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note._id !== id);
      });
    });
  };
  // UPDATE
  const hideModel = (id, data) => {
    if (data.title === "" && data.content === "") {
      deleteNote(id);
    } else {
      axios.patch(URL + `/notes/update/${id}`, data).then(() => {
        getList();
      });
    }
    setShowModel(0);
  };

  return (
    <div className="App">
     <Header/>
     <CreateArea onAdd={getList} URL={URL} />
     {notes.map((noteItem) => {
      const {_id, title, content, updatedAt } = noteItem;
        return (
          <Note
            key={"noteKey" + _id}
            id={_id}
            title={title}
            content={content}
            onDelete={deleteNote}
            onEdit={() => getModel(_id)}
          />
          
        );
      })}
     <Footer/>
    </div>
  );
}

export default App;

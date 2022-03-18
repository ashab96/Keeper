import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";

// import Input from "./formElements/Input";
// import Textarea from "./formElements/Textarea";


function CreateArea(props) {

    const { URL, onAdd } = props;
    const [note, setNote] = useState({
      title: "",
      content: ""
    });
    const [isExpanded, setExpanded] = useState(false);
    function handleChange(event) {
      const { name, value } = event.target;
      setNote((prevNote) => {
        return {
          ...prevNote,
          [name]: value
        };
      });
    }
    // function submitNote(event) {
    //   props.onAdd(note);
    //   setNote({
    //     title: "",
    //     content: ""
    //   });
    //   event.preventDefault();
    // }
      // CREATE
  const submitNote = () => {
    axios.post(URL + "/notes/add", note).then(() => {
      onAdd();
      setNote({
        title: "",
        content: "",
      });
    });
  };
    
  
    const handleExpand = () => {
      setExpanded(true);
    };
  
    return (
      <div>
        <form className="create-note">
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          <textarea
            name="content"
            onClick={handleExpand}
            onChange={handleChange}
            value={note.content}
            placeholder=" Take a note..."
            style={{ padding: isExpanded ? "4px" : "0" }}
            rows={isExpanded ? 3 : 0}
          />
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
    );
  }
  
  export default CreateArea;
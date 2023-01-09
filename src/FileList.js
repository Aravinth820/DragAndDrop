import React, { Component } from "react";
import DragAndDrop from "./DragAndDrop";
import "./DragAndDrop.css";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

//import Display from './Display';

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import { DropzoneAreaBase } from "material-ui-dropzone";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileState: [],
      fileArray: [],
      alertMessage: "",
      alertType: "",
      open: false
    };
  }

  handleDrop = (files) => {
    let fileList = this.state.fileState;
    for (var i = 0; i < files.length; i++) {
      let filterfile = fileList.filter((item) => item === files[i].name);
      if (files[i].name && filterfile.length === 0) {
        fileList.push(files[i].name);
        let fileobj = { file: files[i] };
        this.state.fileArray.push(fileobj);
        this.setState({
          alertMessage: "File " + files[i].name + " successfully added "
        });
        this.setState({ alertType: "success" });
        this.setState({ open: true });
      } else {
        this.setState({
          alertMessage: "File " + files[i].name + " Already added "
        });
        this.setState({ alertType: "warning" });
        this.setState({ open: true });
      }
    }
    this.setState({ fileState: [...fileList] });

    console.log(fileList, "file2");
  };

  handleFiles = (files) => {
    let fileList = this.state.fileState;
    for (var i = 0; i < files.length; i++) {
      let filterfile = fileList.filter((item) => item === files[i].file.name);
      if (files[i].file.name && filterfile.length === 0) {
        fileList.push(files[i].file.name);
        this.state.fileArray.push(files[i]);
      }
    }
    this.setState({ fileState: [...fileList] });
    console.log(fileList, "file2");
  };

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleDelete = (deletefiles) => {
    let filterfile = this.state.fileState.filter(
      (item) => item !== deletefiles
    );
    this.setState({ fileState: [...filterfile] });
  };

  render() {
    console.log(this.state.fileArray, "array");
    return (
      <DragAndDrop handleDrop={this.handleDrop}>
        <div style={{ height: "850px", width: "1900px" }}>
          <DropzoneAreaBase
            onAdd={(fileObjs) => this.handleFiles(fileObjs)}
            onDelete={(fileObj) => console.log("Removed File:", fileObj)}
            // onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
            dropzoneText="Upload File"
            dropzoneClass="button"
            dropzoneParagraphClass="button"
            filesLimit={8}
            Icon={"none"}
          />

          {/* {this.state.fileState.map((file, i)=>
  <div key={i}>
    
     {file}
     
     
     </div>
  )} */}
          {/* <Display fileArray={this.state.fileArray} fileState={this.state.fileState}/> */}
          <div>
            <Typography className="TotalFile">
              Total Files : {this.state.fileState.length}
            </Typography>
            {this.state.fileState.map((file) => (
              <Paper className="paper" elevation={4}>
                <Typography className="fileName">
                  {file}
                  <Button
                    className="delete"
                    onClick={() => this.handleDelete(file)}
                  >
                    <DeleteIcon />
                  </Button>
                </Typography>
              </Paper>
            ))}
          </div>

          <Snackbar
            style={{ left: "10%" }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity={this.state.alertType}>
              {this.state.alertMessage}
            </Alert>
          </Snackbar>
        </div>
        {/* <button onClick={(e)=>this.handleDrop(e.dataTransfer.files)}>Cick me</button>  */}
      </DragAndDrop>
    );
  }
}

export default FileList;

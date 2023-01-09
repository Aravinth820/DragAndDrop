import React from "react";

import Typography from "@material-ui/core/Typography";

import NewWindow from "react-new-window";

function DisplayDetails(path, name, size, type) {
  return (
    <NewWindow>
      <p> path={path} </p>
      <p> name = {name}</p>
      <p> size = {size}</p>
      <p> type = {type}</p>
      <p>hello</p>
    </NewWindow>
  );
}

export default function Display(props) {
  function pdfDisplay(pfdName) {
    let link;
    for (let i of props.fileArray) {
      if (i.file.name === pfdName) {
        link = i;
      }
    }

    // let iframe = '<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0; border: none}</style><title>' + pfdName + '</title></head><body><p> path = ' + link.file.path +' name = '+link.file.name +'</p></html></body>';
    // let win = window.open('<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0; border: none}</style><title>' + pfdName + '</title></head><body><p> path = ' + link.file.path +' name = '+link.file.name +'</p></html></body>', "width=700,height=780,top=0, left=800 ,directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,resizable=yes");
    // console.log(win)
    // win.document.write(iframe);
    // DisplayDetails(link.file.path, link.file.name , link.file.size , link.file.type)
    window.open(
      "<html> <head></head><body><p> path = " +
        link.file.path +
        " name = " +
        link.file.name +
        "</p></body></html>",
      "newWindow",
      "width=500,height=700"
    );
  }

  return (
    <div>
      {props.fileState.map((file) => (
        <Typography
          className="fileName"
          onClick={() => {
            pdfDisplay(file);
          }}
        >
          {file}
        </Typography>
      ))}
    </div>
  );
}

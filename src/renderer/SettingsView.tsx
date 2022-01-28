import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import React from "react";
import fileTypes from "../main/data/Extensions.json";

const FileTypeList = () => {
  return (
    <select>
      {Object.entries(fileTypes as any).map(([keyName, keyIndex]) => (
        <option
          value={keyName}
          key={keyName}
        >{`Extension: .${keyName.toUpperCase()} | File Type: ${keyIndex}`}</option>
      ))}
    </select>
  );
};

class SettingsView extends React.Component {
  render() {
    return (
      <>
        <FileTypeList />{' '}
      </>
    );
  }
}

export default SettingsView;

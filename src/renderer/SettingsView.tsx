import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import fileTypes from '../main/data/Extensions.json';

const FileTypeList = () => {
  return (
    <select
      className="form-select form-select-lg mb-3"
      aria-label=".form-select-lg example"
    >
      {Object.entries(fileTypes as any).map(([keyName, keyIndex]) => (
        <option value={keyName} key={keyName}>
          {keyName.toUpperCase()} | {keyIndex}
        </option>
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

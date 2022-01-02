import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import React, { Fragment } from 'react';

type State = {
  drives?: any;
};

class DriveList extends React.Component<{}, State> {
  constructor(p: {}) {
    super(p);
    this.state = {
      drives: undefined,
    };
  }

  async componentDidMount() {
    const drives = await window.electron.ipcRenderer.getDrives();
    this.setState({
      drives,
    });
  }

  formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  render() {
    const { drives } = this.state;
    return (
      <>
        {drives?.map((d: any) => (
          <Fragment key={d._filesystem}>
            <li
              className="list-group-item bg-light border rounded border-secondary shadow-lg"
              itemID={d._filesystem}
            >
              <span className="fs-2">
                <i className="bi bi-device-hdd" />
              </span>
              <br />
              <span className="fw-bold text-nowrap">Filesystem:</span>
              <span className="fw-normal text-nowrap">{d._filesystem}</span>
              <br />
              <span className="fw-bold text-nowrap">Blocks:</span>
              <span className="fw-normal text-nowrap">
                {this.formatBytes(d._blocks, 0)}
              </span>
              <br />
              <span className="fw-bold text-nowrap">Used:</span>
              <span className="fw-normal text-nowrap">
                {this.formatBytes(d._used, 0)}
              </span>
              <br />
              <span className="fw-bold text-nowrap">Available:</span>
              <span className="fw-normal text-nowrap">
                {this.formatBytes(d._available, 0)}
              </span>
              <br />
              <span className="fw-bold text-nowrap">Capacity:</span>
              <span className="fw-normal text-nowrap">{d._capacity}</span>
              <br />
              <span className="fw-bold text-nowrap"> Mounted:</span>
              <span className="fw-normal text-nowrap">{d._mounted}</span>
              <br />
            </li>
          </Fragment>
        ))}
      </>
    );
  }
}

export default DriveList;

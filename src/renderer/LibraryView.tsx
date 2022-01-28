import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Card } from "react-bootstrap";
import React from "react";
import log from "loglevel";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";

interface DataRow {
  path: string;
  name: string;
  mtime: string;
  size: number;
  type: string;
  extension: string;
  birthtime: string;
}

const cellTypeFormat = (val: string) => {
  if (val === 'directory') {
    return <i className="bi bi-folder" />;
  }
  if (val === 'file') {
    return <i className="bi bi-file" />;
  }
  return val;
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const formatDate = (val: string) => {
  dayjs.extend(localizedFormat);
  return dayjs(val).format('LLL');
};

const columns: TableColumn<DataRow>[] = [
  {
    name: 'Name',
    selector: (row) => row.name,
    grow: 2,
    sortable: true,
  },
  {
    name: 'Path',
    selector: (row) => row.path,
    grow: 3,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Modified',
    selector: (row) => row.mtime,
    cell: (row) => formatDate(row.mtime),
    sortable: true,
    grow: 1,
  },
  {
    name: 'Created',
    selector: (row) => row.birthtime,
    cell: (row) => formatDate(row.birthtime),
    sortable: true,
    grow: 1,
  },
  {
    name: 'Size',
    selector: (row) => row.size,
    cell: (row) => formatBytes(Number(row.size), 0),
    grow: 1,
    sortable: true,
  },
  {
    name: 'Type',
    selector: (row) => row.type,
    cell: (row) => cellTypeFormat(row.type),
    grow: 1,
    sortable: true,
  },
  {
    name: 'Extension',
    selector: (row) => row.extension,
    grow: 1,
    sortable: true,
  },
];

type State = {
  data: any[];
  docID: string;
  libraryPath: string;
  libraryName: string;
  libraryDesc: string;
} & ReturnType<typeof transformPropsToState>;

type Props = {
  docID: string;
  libraryPath: string;
  libraryName: string;
  libraryDesc: string;
  closeLibraryView: React.EventHandler<any>;
};

function transformPropsToState(props: Props) {
  return {
    docID: props.docID,
    libraryPath: props.libraryPath,
    libraryName: props.libraryName,
    libraryDesc: props.libraryDesc,
  };
}

class LibraryView extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      data: [],
      docID: '',
      libraryDesc: '',
      libraryName: '',
      libraryPath: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.closeLibraryView = this.closeLibraryView.bind(this);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    try {
      const { docID } = props;
      const stateDocID = state.docID;
      if (stateDocID === docID) return null;
    } catch (error) {
      log.error(`ERROR ${error}`);
      return null;
    }
    return transformPropsToState(props);
  }

  async componentDidMount() {
    try {
      const { docID } = this.state;
      let prevPath = '';
      const rowData: any = [];
      const docs = await window.electron.database.getLibraryByID(docID);
      log.info(docs);
      // docs[0].libraryTree
      if (docs.docs[0].libraryTree !== undefined) {
        const iterate = (obj: { [x: string]: any }) => {
          Object.keys(obj).forEach((key) => {
            if (prevPath !== obj.path) {
              if (typeof obj[key] !== 'object') {
                const row: DataRow = {
                  name: obj.name,
                  path: obj.path,
                  birthtime: obj.birthtime,
                  mtime: obj.mtime,
                  size: obj.size,
                  type: obj.type,
                  extension: obj.extension,
                };
                rowData.push(row);
                prevPath = obj.path;
              }
              if (typeof obj[key] === 'object') {
                prevPath = obj.path;
                iterate(obj[key]);
              }
            }
          });
        };
        iterate(docs.docs[0].libraryTree.children);
        this.setState({
          data: rowData,
          docID,
          libraryDesc: docs.docs[0].libraryDesc,
          libraryName: docs.docs[0].libraryName,
          libraryPath: docs.docs[0].libraryPath,
        });
      }
      log.info(docs);
    } catch (error) {
      log.error(error);
    }
  }

  handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  closeLibraryView = () => {
    try {
      return (event: React.MouseEvent) => {
        event.preventDefault();
      };
    } catch (error) {
      log.error(`ERROR ${error}`);
      return (event: React.MouseEvent) => {
        event.preventDefault();
      };
    }
  };

  render() {
    const { data, libraryPath, libraryName, libraryDesc } = this.state;
    const { closeLibraryView } = this.props;
    return (
      <>
        <Card className="bg-light border rounded border-secondary shadow-lg">
          <Card.Body>
            <div className="form-group mb-3 float-end">
              <button
                onClick={closeLibraryView}
                type="button"
                className="btn-close"
                aria-label="Close"
              />
            </div>
            <div className="form-group mb-3">
              <FormCheckLabel className="form-label" htmlFor="libraryName">
                Library Name
              </FormCheckLabel>
              <input
                className="form-control"
                type="text"
                name="libraryName"
                id="libraryName"
                value={libraryName}
                placeholder=""
                onChange={this.handleTextChange}
              />
            </div>
            <div className="form-group mb-3">
              <FormCheckLabel className="form-label" htmlFor="libraryDesc">
                Library Description
              </FormCheckLabel>
              <input
                className="form-control"
                type="text"
                id="libraryDesc"
                name="libraryDesc"
                value={libraryDesc}
                onChange={this.handleTextChange}
              />
            </div>
            <div className="form-group mb-3">
              <FormCheckLabel className="form-label" htmlFor="libraryPath">
                Library Path
              </FormCheckLabel>
              <input
                id="libraryPath"
                name="libraryPath"
                disabled
                type="text"
                className="form-control"
                value={libraryPath}
                onChange={this.handleTextChange}
              />
            </div>
            <div className="form-group mb-3 float-end">
              <Button variant="btn btn-secondary" type="submit">
                Update
              </Button>
            </div>
            <div className="form-group mb-3">&nbsp;</div>
            <div className="form-group mb-3">
              <DataTable columns={columns} data={data} pagination />
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default LibraryView;

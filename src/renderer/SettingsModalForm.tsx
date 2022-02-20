import React, { createRef, FormEventHandler, MouseEventHandler } from 'react';
import { Button, Image, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import log from 'loglevel';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import DataTable from 'react-data-table-component';
import { nanoid } from 'nanoid';
import fileTypes from '../main/data/Extensions.json';

const data: any[] = JSON.parse(JSON.stringify(fileTypes as any));
const ref = createRef<HTMLUListElement>() || 0;
const rowData: any = [];

interface DataRow {
  type: string;
  extension: string;
}

type Props = {
  showSettingsModal: boolean;
  handleFormChange: any;
  editSettings: FormEventHandler<HTMLFormElement>;
  closeSettingsModalForm: MouseEventHandler<HTMLButtonElement>;
};

type State = {
  selectedRows: [];
  show: boolean;
};

class SettingsModalForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedRows: [],
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    try {
      Object.entries(data).forEach((entry) => {
        const [extension, type] = entry;
        const row: DataRow = {
          type,
          extension,
        };
        rowData.push(row);
      });
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  }

  handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    const { handleFormChange } = this.props;
    const { selectedRows } = this.state;
    console.log('state', selectedRows);
    this.setState({ selectedRows });
    handleFormChange(event as any);
    event.preventDefault();
  }

  setShow() {
    console.log('here');
    this.setState({ show: true });
  }

  overlay = () => {
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <Button
            variant="light"
            {...triggerHandler}
            className="d-inline-flex align-items-center"
          >
            <Image
              ref={ref}
              roundedCircle
              src="holder.js/20x20?text=J&bg=28a745&fg=FFF"
            />
            <span className="ms-1">Hover to see</span>
          </Button>
        )}
      </OverlayTrigger>
    );
  };

  onTrigger = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { editSettings } = this.props;
    editSettings(event);
  };

  checkHandler = (event: React.FormEvent<HTMLInputElement>) => {
    log.info('checked');
    event.preventDefault();
  };

  fileTypeFormat = (val: string) => {
    switch (val) {
      case 'FONT':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-file-earmark-font dataIcon"
          />
        );
        break;
      case 'WEB':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-globe2 dataIcon"
          />
        );
        break;
      case 'AUDIO':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-file-earmark-music dataIcon"
          />
        );
        break;
      case 'CODE':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-code dataIcon"
          />
        );
        break;
      case 'SLIDE':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-file-ppt  dataIcon"
          />
        );
        break;
      case 'SHEET':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-file-spreadsheet dataIcon"
          />
        );
        break;
      case 'VIDEO':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-file-earmark-play dataIcon"
          />
        );
        break;
      case 'TEXT':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-card-text dataIcon"
          />
        );
        break;
      case 'EXE':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-filetype-exe  dataIcon"
          />
        );
        break;
      case 'IMAGE':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-file-image  dataIcon"
          />
        );
        break;
      case 'ARCHIV':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-file-earmark-zip dataIcon"
          />
        );
      case 'BOOK':
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-bookdataIcon"
          />
        );
      default:
        return (
          <i
            id={nanoid()}
            ref={ref}
            onClick={() => this.setShow}
            className="bi bi-layout-wtf dataIcon"
          />
        );
    }
  };

  // eslint-disable-next-line react/sort-comp
  private clickHandler: any;

  columns(): any[] {
    return [
      {
        name: 'Extension',
        selector: (row: { extension: string }) => row.extension,
        grow: 1,
        sortable: true,
      },
      {
        name: 'Type',
        selector: (row: { type: string }) => row.type,
        cell: (row: { type: string }) => this.fileTypeFormat(row.type),
        grow: 2,
        sortable: true,
      },
      {
        name: 'Remove',
        cell: () => (
          <FormCheckInput
            onClick={this.clickHandler}
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        grow: 3,
      },
    ];
  }

  render() {
    const { showSettingsModal, closeSettingsModalForm } = this.props;
    return (
      <div>
        <Modal centered size="lg" animation={false} show={showSettingsModal}>
          <form
            className="bg-light border rounded border-secondary shadow-lg"
            onSubmit={this.onTrigger}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body className="container-fluid">
              <div className="form-group mb-3">
                <div className="form-group mb-3">
                  <DataTable
                    columns={this.columns()}
                    data={rowData}
                    pagination
                  />
                </div>
              </div>
              <div className="form-group mb-3" />
              <div className="input-group mb-3" />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="btn btn-secondary"
                onClick={closeSettingsModalForm}
              >
                Close
              </Button>
              <Button variant="btn btn-secondary" type="submit">
                Create
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default SettingsModalForm;

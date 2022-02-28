import React, { FormEventHandler, MouseEventHandler } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import log from 'loglevel';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import DataTable from 'react-data-table-component';
import { nanoid } from 'nanoid';
import fileTypes from '../main/data/Extensions.json';

const data: any[] = JSON.parse(JSON.stringify(fileTypes as any));

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
};

class SettingsModalForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedRows: [],
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

  onTrigger = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { editSettings } = this.props;
    editSettings(event);
  };

  fileTypeFormat = (val: string) => {
    switch (val) {
      case 'FONT':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Font file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-file-earmark-font dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'WEB':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Web file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-globe2 dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'AUDIO':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Audio file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-file-earmark-music dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'CODE':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Code file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-code dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'SLIDE':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">PPT file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-file-ppt dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'SHEET':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Sheet file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-file-spreadsheet dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'VIDEO':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Video file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-file-earmark-play dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'TEXT':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Text file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-card-text dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'EXE':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">EXE file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-filetype-exe  dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'IMAGE':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Image file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-file-image  dataIcon"
              />
            )}
          </OverlayTrigger>
        );
        break;
      case 'ARCHIV':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Archive file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <div id={nanoid()} ref={ref} {...triggerHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-file-earmark-zip"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z" />
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                </svg>
              </div>
            )}
          </OverlayTrigger>
        );
      case 'BOOK':
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">PPT file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <i
                id={nanoid()}
                ref={ref}
                {...triggerHandler}
                className="bi bi-book dataIcon"
              />
            )}
          </OverlayTrigger>
        );
      default:
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Unknown file</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <div id={nanoid()} ref={ref} {...triggerHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-layout-wtf"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 1v8H1V1h4zM1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm13 2v5H9V2h5zM9 1a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9zM5 13v2H3v-2h2zm-2-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3zm12-1v2H9v-2h6zm-6-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9z" />
                </svg>
              </div>
            )}
          </OverlayTrigger>
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

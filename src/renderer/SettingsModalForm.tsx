import React, { FormEventHandler, MouseEventHandler } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable, { TableColumn } from 'react-data-table-component';
import log from 'loglevel';
import fileTypes from '../main/data/Extensions.json';

const data: any[] = JSON.parse(JSON.stringify(fileTypes as any));

const rowData: any = [];

interface DataRow {
  type: string;
  extension: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: 'Type',
    selector: (row) => row.type,
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
type Props = {
  showSettingsModal: boolean;
  handleFormChange: any;
  editSettings: FormEventHandler<HTMLFormElement>;
  closeSettingsModalForm: MouseEventHandler<HTMLButtonElement>;
};

class SettingsModalForm extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
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

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { handleFormChange } = this.props;
    handleFormChange(event as any);
    event.preventDefault();
  }

  onTrigger = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { editSettings } = this.props;
    editSettings(event);
  };

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
                  <DataTable columns={columns} data={rowData} pagination />
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

import React, { FormEventHandler, MouseEventHandler } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  showModal: boolean;
  libraryName: string;
  libraryDesc: string;
  libraryPath: string;
  handleFormChange: any;
  createLibrary: FormEventHandler<HTMLFormElement>;
  onBrowse: MouseEventHandler<HTMLButtonElement>;
  closeCreateLibraryForm: MouseEventHandler<HTMLButtonElement>;
};

class LibraryModalForm extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { handleFormChange } = this.props;
    handleFormChange(event as any);
    event.preventDefault();
  }

  onTrigger = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { createLibrary } = this.props;
    createLibrary(event);
  };

  render() {
    const {
      libraryName,
      libraryDesc,
      libraryPath,
      showModal,
      onBrowse,
      closeCreateLibraryForm,
    } = this.props;
    return (
      <div>
        <Modal centered size="lg" animation={false} show={showModal}>
          <form
            className="bg-light border rounded border-secondary shadow-lg"
            onSubmit={this.onTrigger}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create library</Modal.Title>
            </Modal.Header>
            <Modal.Body className="container-fluid">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="libraryName"
                  id="libraryName"
                  value={libraryName}
                  placeholder="Library name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  id="libraryDesc"
                  name="libraryDesc"
                  placeholder="Library description"
                  value={libraryDesc}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  id="libraryPath"
                  name="libraryPath"
                  readOnly
                  type="text"
                  className="form-control"
                  placeholder="Choose a file or folder"
                  value={libraryPath}
                  onChange={this.handleChange}
                />
                <Button
                  onClick={onBrowse}
                  className="btn btn-secondary"
                  type="button"
                >
                  Browse
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="btn btn-secondary"
                onClick={closeCreateLibraryForm}
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

export default LibraryModalForm;

import React, { FormEvent } from 'react';
import Container from 'react-bootstrap/Container';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Button,
  Col,
  ListGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'react-bootstrap';

import { nanoid } from 'nanoid';
import { PlusCircleDotted } from 'react-bootstrap-icons';
import log from 'loglevel';

import DriveList from './Drive';
import Search from './Search';
import './css/sidebars.css';
import './css/main.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Libraries from './Libraries';
import LibraryView from './LibraryView';
import LibraryModalForm from './LibraryModalForm';
import ErrorBoundary from './ErrorBoundary';
import SettingsView from './SettingsView';

type State = {
  showLibraryModal: boolean;
  libraryPath: string;
  libraryName: string;
  libraryDesc: string;
  currentDocId: string;
  showLibraryView: boolean;
  showLibraries: boolean;
  showSettingsView: boolean;
};

class Main extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showLibraryModal: false,
      libraryPath: '',
      libraryName: '',
      libraryDesc: '',
      currentDocId: '',
      showLibraryView: false,
      showLibraries: true,
      showSettingsView: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showCreateLibraryForm = this.showCreateLibraryForm.bind(this);
    this.showLibraryView = this.showLibraryView.bind(this);
    this.showSettingsView = this.showSettingsView.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const newState = {
        [event.target.name as string]: event.target.value as any,
      } as State;
      this.setState(newState);
      event.preventDefault();
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  }

  onBrowse = async () => {
    try {
      const dialog = await window.electron.dialog.showOpenDialog();
      if (dialog?.canceled !== true) {
        this.setState({ libraryPath: dialog?.filePaths[0] });
      }
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  };

  showCreateLibraryForm = async () => {
    try {
      this.setState({ showLibraryModal: true });
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  };

  closeCreateLibraryForm = async () => {
    try {
      this.setState({ showLibraryModal: false });
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  };

  closeSettingsView = () => {
    try {
      this.setState({ showSettingsView: false , showLibraries: true});
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  };

  showSettingsView = async () => {
    try {
      this.setState({ showSettingsView: true, showLibraries: false });
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  };

  closeLibraryView = () => {
    try {
      this.setState({
        showLibraryView: false,
        currentDocId: '',
        showLibraries: true,
      });
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  };

  showLibraryView = (event: Event) => {
    try {
      const target = event.target as HTMLButtonElement;
      this.setState({
        showLibraryView: true,
        currentDocId: target.value,
        showLibraries: false,
      });
      event.preventDefault();
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  };

  createLibrary = async (event: FormEvent<HTMLFormElement>) => {
    try {
      const libraryPath = event.currentTarget.elements.namedItem(
        'libraryPath'
      ) as HTMLInputElement;

      const libraryDesc = event.currentTarget.elements.namedItem(
        'libraryDesc'
      ) as HTMLInputElement;

      const libraryName = event.currentTarget.elements.namedItem(
        'libraryName'
      ) as HTMLInputElement;

      const dt: any = new Date();
      const id = nanoid();

      const dirTree = await window.electron.dirTree.getDirTree(
        libraryPath.value
      );

      const doc = {
        _id: id,
        libraryPath: libraryPath.value,
        libraryName: libraryName.value,
        libraryDesc: libraryDesc.value,
        libraryTree: dirTree,
        treeCount: dirTree.children.length,
        createdAt: dt.toISOString(),
      };

      const currentDocId = await window.electron.database.createLibrary(doc);

      this.setState({
        currentDocId: currentDocId?.id,
        showLibraryView: true,
        showLibraryModal: false,
        libraryPath: '',
        libraryName: '',
        libraryDesc: '',
        showLibraries: false,
      });
      event.preventDefault();
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  };

  render() {
    const {
      currentDocId,
      showLibraryModal,
      showLibraryView,
      libraryDesc,
      libraryName,
      libraryPath,
      showLibraries,
      showSettingsView,
    } = this.state;
    return (
      <>
        <Container fluid>
          <Row>
            <Col className="col-2">
              <main>
                <div
                  className="flex-column flex-shrink-3 p-3 text-dark bg-light border rounded border-secondary shadow-lg"
                  style={{ width: 280 }}
                >
                  <div className="fw-bolder fs-2 mx-auto mb-3 border rounded border-secondary shadow-sm align-middle">
                    <i className="ms-1 me-1 bi bi-collection-fill" />
                    &nbsp;&nbsp;&nbsp;filebase
                  </div>
                  <hr />
                  <Nav className="flex-column mx-auto">
                    <NavItem className="justify-content-center mx-auto margin-0 padding-0">
                      <Button
                        onClick={this.showCreateLibraryForm}
                        type="button"
                        variant="outline-dark btn-lg"
                      >
                        <PlusCircleDotted
                          onClick={this.showCreateLibraryForm}
                        />
                        &nbsp; Create Library
                      </Button>
                    </NavItem>
                    <hr />
                    <ListGroup.Item>
                      <NavLink
                        active={false}
                        href="#"
                        onClick={this.showSettingsView}
                        className="text-dark rounded"
                      >
                        <i className="me-2 bi bi-sliders" />
                        Settings
                      </NavLink>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <NavLink
                        active={false}
                        href="#"
                        className="text-dark rounded"
                      >
                        <i className="me-2 bi bi-file-zip-fill" />
                        Archives
                      </NavLink>
                    </ListGroup.Item>
                  </Nav>
                </div>
              </main>
            </Col>
            <Col className="col-8">
              <Row className="row-cols-1 justify-content-center">
                <ErrorBoundary>
                  <Search />
                </ErrorBoundary>
              </Row>
              <Row className="mb-0 row-cols-1 justify-content-center">
                {showSettingsView ? (
                  <ErrorBoundary>
                    {' '}
                    <SettingsView
                      closeSettingsView={this.closeSettingsView}
                    />{' '}
                  </ErrorBoundary>
                ) : null}
              </Row>
              <Row className="mb-4 row-cols-1 justify-content-center">
                {showLibraries ? (
                  <ErrorBoundary>
                    {' '}
                    <Libraries showLibraryView={this.showLibraryView} />{' '}
                  </ErrorBoundary>
                ) : null}
              </Row>
              <Row className="row-cols-1 justify-content-center">
                {showLibraryView ? (
                  <ErrorBoundary>
                    <LibraryView
                      docID={currentDocId}
                      libraryDesc={libraryDesc}
                      libraryPath={libraryPath}
                      libraryName={libraryName}
                      closeLibraryView={this.closeLibraryView}
                    />
                  </ErrorBoundary>
                ) : null}
              </Row>
            </Col>
            <Col className="col-2">
              <div className="row-cols-1" />
              <ErrorBoundary>
                <DriveList />
              </ErrorBoundary>
            </Col>
          </Row>
          <Row>
            <ErrorBoundary>
              <LibraryModalForm
                showLibraryModal={showLibraryModal}
                createLibrary={this.createLibrary}
                libraryDesc={libraryDesc}
                libraryName={libraryName}
                closeCreateLibraryForm={this.closeCreateLibraryForm}
                handleFormChange={this.handleChange as any}
                libraryPath={libraryPath}
                onBrowse={this.onBrowse}
              />
            </ErrorBoundary>
          </Row>
        </Container>
      </>
    );
  }
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

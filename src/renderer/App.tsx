import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './bootstrap.css';
import React, { Fragment } from 'react';
import {
  Row,
  Nav,
  NavDropdown,
  Navbar,
  Container,
  Col,
  ListGroup,
} from 'react-bootstrap';

type State = {
  drives: JSX.Element[] | string;
};

class Index extends React.Component<{}, State> {
  constructor(p: {}) {
    super(p);
    this.state = {
      drives: '',
    };
  }

  async componentDidMount() {
    const list = await this.getDrives().then((result) => {
      return result;
    });

    this.setState({
      drives: list,
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

  getDrives = (): Promise<JSX.Element[]> => {
    const out = new Promise<JSX.Element[]>((resolve, reject) => {
      let list: JSX.Element[];
      try {
        window.electron.ipcRenderer.getDrives();
        window.electron.ipcRenderer.getDrivesOnce('get-drives', (arg: any) => {
          list = arg.map((d: any) => {
            return (
              <Fragment key={d._filesystem}>
                <li className="list-group-item" itemID={d._filesystem}>
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <span className="fw-bold text-nowrap">Filesystem:</span>{' '}
                  <span className="fw-normal text-nowrap">{d._filesystem}</span>{' '}
                  <br />
                  <span className="fw-bold text-nowrap">Blocks:</span>{' '}
                  <span className="fw-normal text-nowrap">{this.formatBytes(d._blocks, 0)}</span>{' '}
                  <br />
                  <span className="fw-bold text-nowrap">Used:</span>{' '}
                  <span className="fw-normal text-nowrap">{this.formatBytes(d._used, 0)}</span>{' '}
                  <br />
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <span className="fw-bold text-nowrap">Available:</span>{' '}
                  <span className="fw-normal text-nowrap">{this.formatBytes(d._available, 0)}</span>{' '}
                  <br />
                  <span className="fw-bold text-nowrap">Capacity:</span>{' '}
                  <span className="fw-normal text-nowrap">{d._capacity}</span>
                  <br />
                  <span className="fw-bold text-nowrap"> Mounted:</span>{' '}
                  <span className="fw-normal text-nowrap">{d._mounted}</span>
                  <br />
                  {/* eslint-disable-next-line no-underscore-dangle */}
                </li>
              </Fragment>
            );
          });
          resolve(list);
        });
      } catch (error) {
        reject(error);
      }
    });
    return out;
  };

  render() {
    const { drives } = this.state;
    return (
      <Container fluid="md">
        <Navbar bg="light" expand="lg">
          <Container fluid="md">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/">Action</NavDropdown.Item>
                  <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="/">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Row>
          <Col sm={1}>&nbsp;</Col>
          <Col lg={8}>Drive list</Col>
          <Col sm={1}>&nbsp;</Col>
        </Row>
        <Row>
          <Col sm={1}>&nbsp;</Col>
          <Col lg={8}>
            <ListGroup>{drives}</ListGroup>
          </Col>
          <Col sm={1}>&nbsp;</Col>;
        </Row>
      </Container>
    );
  }
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  );
}

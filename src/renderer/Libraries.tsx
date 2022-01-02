import React, { Fragment } from 'react';
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';
import { BinocularsFill, Collection, PencilFill } from 'react-bootstrap-icons';
import log from 'loglevel';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

type State = {
  libraries?: any;
};

type Props = {
  showLibraryView: React.EventHandler<any>;
};

class Libraries extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      libraries: undefined,
    };
  }

  async componentDidMount() {
    try {
      const lib = await window.electron.database.getLibraries();
      this.setState({
        libraries: lib,
      });
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  }

  async handleChange() {
    try {
      const lib = await window.electron.database.getLibraries();
      this.setState({
        libraries: lib,
      });
    } catch (error) {
      log.error(`ERROR ${error}`);
    }
  }

  // render will know everything!
  render() {
    dayjs.extend(localizedFormat);
    const { libraries } = this.state;
    const { showLibraryView } = this.props;
    return (
      <Row
        xs={1}
        md={2}
        className="g-4 bg-light border rounded border-secondary shadow-lg pb-4"
      >
        {libraries?.docs?.map((d: any) => (
          <Fragment key={d._id}>
            <Col>
              <Card itemID={d._id} className="border border-secondary">
                <Card.Header className="fs-4 mb-2">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="p2 text-start">
                      <Collection
                        width="1.5em"
                        height="1.5em"
                        className="p-1"
                      />
                      {d.libraryName}
                    </div>
                    <div className="p2 text-end">
                      <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                        Created:&nbsp;
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 'normal' }}>
                        {dayjs(d.createdAt).format('LLL')}
                      </span>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Text as="div" className="m-2">
                    <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                      Library Description:
                    </span>
                    <Card.Text as="div">{d.libraryDesc}</Card.Text>
                  </Card.Text>
                  <Card.Text as="div" className="m-2">
                    <span
                      className="mb-1"
                      style={{ fontSize: 14, fontWeight: 'bold' }}
                    >
                      Library path:
                    </span>
                    <Card.Text as="div">{d.libraryPath}</Card.Text> <br />
                    <ButtonGroup size="sm" className="mt-3">
                      <Button variant="outline-dark">
                        <BinocularsFill
                          width="1.5em"
                          height="1.5em"
                          className="bi p-1"
                        />
                      </Button>
                      <Button
                        onClick={showLibraryView}
                        value={d._id}
                        variant="outline-dark"
                      >
                        <PencilFill
                          width="1.5em"
                          height="1.5em"
                          className="bi p-1"
                        />
                      </Button>
                    </ButtonGroup>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Fragment>
        ))}
      </Row>
    );
  }
}

export default Libraries;

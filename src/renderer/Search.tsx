import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Card } from 'react-bootstrap';

class Search extends React.Component {
  constructor(props: {}) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  render() {
    return (
      <>
        <Card className="bg-light border rounded border-secondary shadow-lg">
          <Card.Body>
            <InputGroup>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Search libraries"
                aria-label="Search libraries.."
                aria-describedby="button-addon2"
                value=""
                onChange={this.handleChange}
              />
              <Button className="btn-secondary" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Search;

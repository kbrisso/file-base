import { Card, Tab, Tabs } from 'react-bootstrap';
import log from 'loglevel';
import React from 'react';
import FileExtensionSettings from './FileExtensionSettings';

type Props = {
  closeSettingsView: React.EventHandler<any>;
};

type State = {
  key: any;
};

class SettingsView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { key: 'feKey' };
    this.closeSettingsView = this.closeSettingsView.bind(this);
  }

  async componentDidMount() {
    this.setState({
      key: 'feKey',
    });
  }

  handleTabClick(key: any) {
    this.setState({
      key,
    });
  }

  closeSettingsView = () => {
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
    const { closeSettingsView } = this.props;
    const { key } = this.state;
    const { setKey } = key;
    return (
      <>
        <Card className="bg-light border rounded border-secondary shadow-lg">
          <Card.Body>
            <div className="form-group mb-3 float-end">
              <button
                onClick={closeSettingsView}
                type="button"
                className="btn-close"
                aria-label="Close"
              />
            </div>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              activeKey={key}
              onSelect={(k) => this.handleTabClick(k)}
              className="mb-3 bg-light"
            >
              <Tab
                tabClassName="secondary"
                eventKey="feKey"
                title="File Extensions"
              >
                <FileExtensionSettings />
              </Tab>
              <Tab tabClassName="secondary" eventKey="tagsKey" title="Tags" />
              <Tab
                tabClassName="secondary"
                eventKey="contactKey"
                title="Contact"
              />
            </Tabs>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default SettingsView;

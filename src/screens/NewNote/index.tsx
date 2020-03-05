import React, { Component } from "react";
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import LoaderButton from '../../components/LoaderButton';
import config from '../../config';
import { s3Upload } from '../../libs/awsLib';
import { createNote } from "../../services/notes";
import { formatBytes } from '../../utils/format'
import './index.css';

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      content: "",
    };
  }

  isValidForm = () => (this.state.content.length)

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleFieldChange = ({ target }) => {
    const { id, value } = target;

    this.setState({
      [id]: value
    });
  };

  handleFileChange = event => {
    const file = event.target.files[0];

    if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${formatBytes(config.MAX_ATTACHMENT_SIZE)}`);
      // remove invalid file from input
      event.target.value = null;
      return;
    }

    this.file = file;
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    const { content } = this.state;

    try {
      const payload = {
        content,
      }

      if (this.file) {
        payload.attachment = await s3Upload(this.file);
      }

      await createNote(payload)

      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { content, isLoading } = this.state;

    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleFieldChange}
              value={content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.isValidForm()}
            type="submit"
            isLoading={isLoading}
            text="Create"
            loadingText="Creating..."
          />
        </form>
      </div>
    );
  }
}

export default NewNote

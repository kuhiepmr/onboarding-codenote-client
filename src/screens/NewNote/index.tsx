import { API } from "aws-amplify";
import React, { Component } from "react";
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import LoaderButton from '../../components/LoaderButton';
import config from '../../config';
import { s3Upload } from '../../libs/awsLib';
import './index.css';

class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: "",
    };
  }

  saveNote(body) {
    return API.post("notes", `/notes`, { body });
  }

  validateForm = () => (this.state.content.length)

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    const file = event.target.files[0];

    if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
      return;
    }
    this.file = file;
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const payload = {
        content: this.state.content,
      }

      if (this.file) {
        payload.attachment = await s3Upload(this.file);
      }

      await this.saveNote(payload)

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
              onChange={this.handleChange}
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
            disabled={!this.validateForm()}
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

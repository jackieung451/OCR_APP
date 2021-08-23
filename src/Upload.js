import React, { Component } from "react";
import { Button, Form, FormGroup, Label, FormText, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import FileBase64 from "react-file-base64";
import "./upload.css";

export default class Upload extends Component {
  state = {
    confirmation: "",
    isLoading: "",
    files: "",
    Invoice: "",
    Amount: "",
    Date: "",
    Vendor: "",
    Description: "",
  };

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ confirmation: "Uploading..." });
  }

  async getFiles(files) {
    this.setState({
      isLoading: "Extracting data",
      files: files,
    });

    const UID = Math.round(1 + Math.random() * (1000000 - 1));

    var date = {
      fileExt: "png",
      imageID: UID,
      folder: UID,
      img: this.state.files[0].base64,
    };

    await fetch(
      "https://5c6fsmmma2.execute-api.us-east-1.amazonaws.com/Production",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application.json",
        },
        body: JSON.stringify(date),
      }
    );
  }
  render() {
    const processing = "Processing document...";
    return (
      <div className="row">
        <div className="col-6 offset-3">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <h3 className="text-danger">{processing}</h3>
              <h6>Upload Invoice</h6>
              <FormText color="muted">PNG,JPG</FormText>

              <div className="form-group files color">
                <FileBase64
                  multiple={true}
                  onDone={this.getFiles.bind(this)}
                ></FileBase64>
              </div>
            </FormGroup>

            <FormGroup>
              <Label>
                <h6>Invoice</h6>
              </Label>
              <Input
                type="text"
                name="Invoice"
                id="Invoice"
                required
                value={this.state.Invoice}
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <h6>Amount ($)</h6>
              </Label>
              <Input
                type="text"
                name="Amount"
                id="Amount"
                required
                value={this.state.Amount}
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <h6>Date</h6>
              </Label>
              <Input
                type="text"
                name="Date"
                id="Date"
                required
                value={this.state.Date}
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <h6>Vendor</h6>
              </Label>
              <Input
                type="text"
                name="Vendor"
                id="Vendor"
                required
                value={this.state.Vendor}
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <h6>Description</h6>
              </Label>
              <Input
                type="text"
                name="Description"
                id="Description"
                required
                value={this.state.Description}
              />
            </FormGroup>
            <Button className="btn btn-lg btn-block btn-success">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

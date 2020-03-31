import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FieldGroup from '../commons/components/FieldGroup';
import styled from 'styled-components';
import { validateAddUserForm, bindThisHereHelper } from 'utils';

export interface AddUser {
  email: string;
  name: string;
  password: string;
}
interface State extends AddUser {
  confirmPassword: string;
  loading: boolean;
  errMsg: string;
}
interface Props {
  setShow: (value: boolean) => void;
  show: boolean;
  onSubmit: (user: AddUser) => void;
}

const SubmitBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

class AddNewUserModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      loading: false,
      errMsg: '',
    };

    bindThisHereHelper(this, [
      'onSubmit',
      'onChangeEmail',
      'onChangeName',
      'onChangePassword',
      'onChangeConfirmPassword',
    ]);

    // this.onSubmit = this.onSubmit.bind(this);
    // this.onChangeEmail = this.onChangeEmail.bind(this);
    // this.onChangeName = this.onChangeName.bind(this);
    // this.onChangePassword = this.onChangePassword.bind(this);
    // this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
  }

  onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const { email, name, password } = this.state;
    const ALERT_ERROR = true;
    const errMsg = validateAddUserForm(this.state, false);
    if (errMsg) {
      this.setState({
        errMsg: errMsg as string,
      });
    }
    if (!validateAddUserForm(this.state, ALERT_ERROR)) {
      this.props.onSubmit({
        email,
        name,
        password,
      } as AddUser);
    }
  }

  onChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      name: e.target.value,
    });
  }
  onChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeConfirmPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      confirmPassword: e.target.value,
    });
  }

  render(): JSX.Element {
    return (
      <Modal
        size={12}
        show={this.props.show}
        onHide={(): void => this.props.setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add new user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSubmit}>
            <FieldGroup
              id="formControlsEmail"
              type="email"
              label="Email address"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            <FieldGroup
              id="formControlsName"
              label="Name"
              value={this.state.name}
              onChange={this.onChangeName}
            />
            <FieldGroup
              id="formControlsPassword"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
            <FieldGroup
              id="formControlsConfirmPassword"
              label="Confirm Password"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.onChangeConfirmPassword}
              help={this.state.errMsg}
            />
            <SubmitBtnWrapper>
              <Button
                disabled={this.state.loading}
                className="btn btn-info"
                type="submit">
                Submit
              </Button>
            </SubmitBtnWrapper>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddNewUserModal;

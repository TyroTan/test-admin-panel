import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { loginPOST } from '../services/backend';
import FieldGroup from '../commons/components/FieldGroup';
import { setCurrentSession, getAxios422ResponseMsg } from 'utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  height: 400px;
  width: 400px;
`;

const PanelTitle = styled(Panel.Title)`
  text-align: center;
  font-weight: bold;
`;

const SubmitBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface State {
  email: string;
  password: string;
  loading: boolean;
}

class LoginForm extends React.Component<{}, State> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ password: e.target.value });
  }

  async onSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const result = await loginPOST({
        data: {
          email,
          password,
        },
      });

      if (result && result.token) {
        setCurrentSession(result);
        window.location.href = '/';
        return;
      }

      this.setState({
        loading: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
      const msg = getAxios422ResponseMsg(e);
      if (msg) {
        alert(msg);
      }
    }
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        <Content>
          <Panel bsStyle="info">
            <Panel.Heading>
              <PanelTitle componentClass="h3">LOGIN</PanelTitle>
            </Panel.Heading>
            <Panel.Body>
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
                  id="formControlsPassword"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
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
            </Panel.Body>
          </Panel>
        </Content>
      </Wrapper>
    );
  }
}

export default LoginForm;

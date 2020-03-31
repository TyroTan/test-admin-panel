/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import { Card } from 'bs4dashboard/components/Card/Card.jsx';
import { FormInputs } from 'bs4dashboard/components/FormInputs/FormInputs.jsx';
import { UserCard } from 'bs4dashboard/components/UserCard/UserCard.jsx';
import Button from 'bs4dashboard/components/CustomButton/CustomButton.jsx';

import { getCurrentSession } from '../../utils';
import avatar from 'bs4dashboard/assets/img/faces/face-3.jpg';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async componentDidMount() {
    const userSession = await getCurrentSession();

    if (userSession?.email) {
      this.setState({
        email: userSession.email,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={['col-md-12']}
                      properties={[
                        {
                          label: 'Email address',
                          type: 'email',
                          bsClass: 'form-control',
                          placeholder: 'Email',
                          defaultValue: this.state.email,
                          disabled: true,
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-6', 'col-md-6']}
                      properties={[
                        {
                          label: 'Password',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Password',
                          defaultValue: '',
                        },
                        {
                          label: 'New Password',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'New Password',
                          defaultValue: '',
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name="Mike Andrew"
                userName="michael24"
                description={
                  <span>
                    "Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;

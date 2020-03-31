/* eslint-disable @typescript-eslint/explicit-function-return-type */

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
import { Button, Grid, Row, Col, Table } from 'react-bootstrap';
import styled from 'styled-components';
import Card from 'bs4dashboard/components/Card/Card.jsx';
import { usersGET, userPOST } from '../../services/backend';
import AddNewUserModal from '../../components/AddNewUserModal';
import { bindThisHereHelper, getAxios422ResponseMsg } from 'utils';
// import { thArray, tdArray } from 'bs4dashboard/variables/Variables.jsx';

const TH_ARRAY = ['ID', 'Email', 'Name', 'Actions'];
const userFieldsToTHArrayCompatible = (userObj) => {
  return [userObj.user_id, userObj.email, userObj.name];
};

const ActionButtonWrapper = styled.div`
  > button {
    margin: 10px;
  }
`;

const DivMargin = styled.div`
  margin: ${(props) => props.margin}px;
`;

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isModalOpen: false,
    };

    // this.setIsModalOpen = this.setIsModalOpen.bind(this);
    bindThisHereHelper(this, [
      'fetchUsers',
      'setIsModalOpen',
      'onSubmitAddNewUser',
    ]);
  }

  async fetchUsers() {
    try {
      const result = await usersGET();
      this.setState({
        users: result?.data?.length ? result.data : [],
      });
    } catch (e) {
      console.log('usersGET e', e);
    }
  }

  async componentDidMount() {
    this.fetchUsers();
  }

  async onSubmitAddNewUser(user) {
    try {
      this.setState({ loading: true });
      const res = await userPOST({
        data: user,
      });

      if (res && res.user_id) {
        this.fetchUsers();
        this.setIsModalOpen(false);
      }
    } catch (e) {
      const msg = getAxios422ResponseMsg(e);
      if (msg) {
        alert(msg);
      }
      console.log('users/ e', e);
    }
    this.setState({ loading: true });
  }

  renderAddNewUser() {
    return (
      <Row>
        <Col md={12}>
          <Button
            onClick={() => {
              this.setIsModalOpen(true);
            }}
            className="btn-primary">
            Add New User
          </Button>
        </Col>
      </Row>
    );
  }

  renderActions() {
    return (
      <ActionButtonWrapper>
        <Button className="btn-info">Edit</Button>
        <Button className="btn-warning">Delete</Button>
      </ActionButtonWrapper>
    );
  }

  setIsModalOpen(value) {
    this.setState({
      isModalOpen: value,
    });
  }

  render() {
    return (
      <div className="content">
        <AddNewUserModal
          onSubmit={this.onSubmitAddNewUser}
          show={this.state.isModalOpen}
          setShow={this.setIsModalOpen}
        />
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Users List"
                category="Users here will be able to login to Expo RN App"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <DivMargin margin={10}>{this.renderAddNewUser()}</DivMargin>
                    <Table striped hover>
                      <thead>
                        <tr>
                          {TH_ARRAY.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map((prop, key) => {
                          return (
                            <tr key={key}>
                              {userFieldsToTHArrayCompatible(prop).map(
                                (prop, key) => {
                                  return <td key={key}>{prop}</td>;
                                },
                              )}
                              {this.renderActions()}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
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

export default TableList;

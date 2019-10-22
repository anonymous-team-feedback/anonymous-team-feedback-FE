import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  PageDiv,
  CreateTeamLandingPage,
  TeamCreationContainer,
  Input,
  MainListContainer,
  SubListContainer,
  H2,
  H1,
  P
} from "./teamMembersList-style.js";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";

import { Menu, Table, Message, Pagination } from "semantic-ui-react";

import {
  findTeamBySlug,
  findUser
} from "../../actions/usersActions";

class TeamMembersList extends React.Component {
  state = {
    page: 1,
    itemsPerPage: 10,
    team: "",
    slug: "",
    existingSlug: "",
    members: [],
    memberInfo: [],
    allMembersInfo:[],
    user: this.props.userFullInfo
  };

  componentDidMount() {
    let mountFullMembers = this.getMembersInfo();
    this.setState({allMembersInfo: mountFullMembers});

    // full user info
    console.log("this is state.user:", this.state.user);

    // on mount 
    console.log("this is mountFullMembers:", mountFullMembers);

  }

  // work in progress
  getMembersInfo= e => {
    let fullMembers = [];

    this.props.members.map( id => {
      // gets user data
      this.props.findUser(id);
      // pushes from reducer
      fullMembers.push(this.props.userFullInfo);
    });

    console.log("this is fullMembers" , fullMembers);
    return fullMembers;
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { itemsPerPage } = this.state;
    const { page } = this.state;
    const totalPages = this.state.allMembersInfo ? Math.floor(this.state.allMembersInfo.length / itemsPerPage) : 0;

    const items = this.state.allMembersInfo ? this.state.allMembersInfo.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
    ) : 0;
    
    return (
      <PageDiv className="JoinTeamRequest">
        <MainListContainer>
          <SubListContainer>
              <H2>
                Here's a list of your colleagues who have joined your InCog team
                to date:
              </H2>
              {(this.state.allMembersInfo && this.state.allMembersInfo.length > 0) && (
              <div>
                <Table unstackable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell className="name-tab" width={2}>
                        Name
                      </Table.HeaderCell>
                      <Table.HeaderCell className="email-tab" width={4}>
                        Email
                      </Table.HeaderCell>
                      <Table.HeaderCell className="title-tab" width={4}>
                        Title
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  {/* Mapping out members */}

                  <Table.Body className="TeamMembersList">
                    {items.map((member, index) => (
                      <Table.Row>
                        <Table.Cell width={2}>
                          {member.firstName} {member.lastName}
                        </Table.Cell>
                        <Table.Cell width={4}>{member.email}</Table.Cell>
                        <Table.Cell width={4} key={index}>
                          {member.jobTitle}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>

                  {/* Pagination for Members List */}

                  <Table.Footer className="TeamMembersPageNav">
                    <Table.Row>
                      <Table.HeaderCell colSpan="3">
                        <Menu pagination>
                          <Menu.Item as="a" icon>
                            <Pagination
                              activePage={page}
                              totalPages={totalPages}
                              siblingRange={1}
                              onPageChange={this.setPageNumber}
                            />
                          </Menu.Item>
                        </Menu>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </div>
              )}
          </SubListContainer>
        </MainListContainer>
      </PageDiv>
    );
  }
}

const mapStateToProps = state => {
  const { usersReducer, joinTeamRequestReducer } = state;
  return {
    team: joinTeamRequestReducer.team,
    members: joinTeamRequestReducer.members,
    slug: joinTeamRequestReducer.slug,
    membersInfo: usersReducer.members,
    userInfo: usersReducer.userInfo,
    userFullInfo: usersReducer.userInfo,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { findTeamBySlug, findUser}
  )(TeamMembersList)
);
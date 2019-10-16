import {
  SUBMIT_JOIN_EXISTING_TEAM_START,
  SUBMIT_JOIN_EXISTING_TEAM_SUCCESS,
  SUBMIT_JOIN_EXISTING_TEAM_FAILURE,

  SUBMIT_CREATE_NEW_TEAM_START,
  SUBMIT_CREATE_NEW_TEAM_SUCCESS,
  SUBMIT_CREATE_NEW_TEAM_FAILURE,

  FETCH_ALL_MEMBERS_START,
  FETCH_ALL_MEMBERS_SUCCESS,
  FETCH_ALL_MEMBERS_FAILURE,

  GET_TEAM_DATA_START,
  GET_TEAM_DATA_SUCCESS,
  GET_TEAM_DATA_FAIL
} from "../actions/joinTeamRequestActions";

const initialState = {
  name: "",
  slug: null,
  members: [],

  isJoiningExistingTeam: false,
  joiningExistingTeamError: null,

  isSubmittingNewTeam: false,
  submitNewTeamError: null,

  fetchAllMembersLoading: false,
  fetchAllMembersError: null
};

export const joinTeamRequestReducer = (state = initialState, action) => {
  switch (action.type) {

    case SUBMIT_JOIN_EXISTING_TEAM_START: {
        return {
          ...state,
          isJoiningExistingTeam: true
        };
      }
      case SUBMIT_JOIN_EXISTING_TEAM_SUCCESS: {
        return {
          ...state,
          isJoiningExistingTeam: false
        };
      }
      case SUBMIT_JOIN_EXISTING_TEAM_FAILURE: {
        return {
          ...state,
          isJoiningExistingTeam: false,
          joiningExistingTeamError: action.payload
        };
      }

    case SUBMIT_CREATE_NEW_TEAM_START: {
      return {
        ...state,
        isSubmittingNewTeam: true
      };
    }
    case SUBMIT_CREATE_NEW_TEAM_SUCCESS: {
      return {
        ...state,
        isSubmittingNewTeam: false
      };
    }
    case SUBMIT_CREATE_NEW_TEAM_FAILURE: {
      return {
        ...state,
        isSubmittingNewTeam: false,
        submitNewTeamError: action.payload
      };
    }

    case FETCH_ALL_MEMBERS_START:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case FETCH_ALL_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload,
        loading: false,
        error: ""
      };
    case FETCH_ALL_MEMBERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_TEAM_DATA_START:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case GET_TEAM_DATA_SUCCESS:
      return {
        ...state,
        members: action.payload.team.members,
        slug: action.payload.team.slug,
        name: action.payload.team.name,
        loading: false,
        error: ""
      };
    case GET_TEAM_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default joinTeamRequestReducer;

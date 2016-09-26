import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch(action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;

        case types.CREATE_COURSE_SUCCESS:
            return [
				...state,
				Object.assign({}, action.course)
            ];
        
        case types.UPDATE_COURSE_SUCCESS:
            return [
				...state.filter(course => course.id != action.course.id),
				Object.assign({}, action.course)
            ];

        case types.DELETE_COURSE_SUCCESS: {
            let newState = [];
            for (let courseidx in state) {
                if (state[courseidx].id != action.course.id) {
                    newState.push(state[courseidx]);
                }
            }
            return newState;
        }

        default:
            return state;
    }
}
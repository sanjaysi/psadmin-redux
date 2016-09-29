import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, errorAjaxCall} from './ajaxStatusActions';
import axios from 'axios';

export function loadCoursesSuccess(courses) {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function updateCourseSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function createCourseSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function deleteCourseSuccess(course) {
    return {type: types.DELETE_COURSE_SUCCESS, course};
}

export function loadCourses() {
	return function(dispatch) {
		dispatch(beginAjaxCall());
		return axios.get('http://localhost:4000/courses').then(courses => {
			dispatch(loadCoursesSuccess(courses.data));
		}).catch(error => {
			throw(error);
		});
	};
}

/*
export function loadCourses() {
	return function(dispatch) {
		dispatch(beginAjaxCall());
		return courseApi.getAllCourses().then(courses => {
			dispatch(loadCoursesSuccess(courses));
		}).catch(error => {
			throw(error);
		});
	};
}
*/

export function saveCourse(course) {
	return function(dispatch) {
		dispatch(beginAjaxCall());
		return courseApi.saveCourse(course)
						.then(savedCourse => {
							course.id ? dispatch(updateCourseSuccess(savedCourse)) : 
								dispatch(createCourseSuccess(savedCourse));
							})
						.catch(error => {
							dispatch(errorAjaxCall(error));
							throw(error);
							});
	};
}

export function deleteCourse(course) {
	return function(dispatch) {
		dispatch(beginAjaxCall());
		return courseApi.deleteCourse(course.id)
						.then(() => {
							dispatch(deleteCourseSuccess(course)); 
							})
						.catch(error => {
							dispatch(errorAjaxCall(error));
							throw(error);
							});
	};
}
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course}) => {
	return (
		<tr>
			<td><a href={course.watchHref} target="_blank">Play</a></td>
			{/*<td input type="button" className="btn btn-link" >Watch</td>*/}
			<td><Link to={'/course/' + course.id}>{course.title}</Link></td>
			<td>{course.authorId}</td>
			<td>{course.category}</td>
			<td>{course.length}</td>
		</tr>
	);
};

CourseListRow.propTypes = {
	course: PropTypes.object.isRequired
};

export default CourseListRow;
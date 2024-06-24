import { useNavigate } from "react-router-dom";

export const JobCard = ({ job }) => {
	const navigate = useNavigate();
	const {
		title,
		logoUrl,
		salary,
		location,
		duration,
		locationType,
		jobType,
		skills,
		_id,
	} = job;
	const altJobIcon = "https://static.thenounproject.com/png/2343509-200.png";

	console.log(job);
	return (
		<div style={{position:'absolute',top:'30%',left:'30%'}}>
			{title}
			<img src={logoUrl} alt={altJobIcon} style={{width:'20', height:'25'}} />
			{salary}
			{location}
			{duration}
			{locationType}
			{jobType}
			{skills.map((skill, index) => {
				return <div key={index}>{skill}</div>;
			})}
			<button
				onClick={() => {
					navigate(`/job/${_id}`);
				}}
			>
				View Details
			</button>
		</div>
	);
};
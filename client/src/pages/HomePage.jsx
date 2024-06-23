import { useEffect, useState } from "react";
import { fetchJobsByQuery } from "../api/Job";
import { Header } from "../components/Header";
import { QueryWidget } from "../components/QueryWidget";
import { JobCard } from "../components/JobCard";

function HomePage({ currentUser, setCurrentUser }) {
	const [jobs, setJobs] = useState([]);
	const [query, setQuery] = useState({
		title: "",
		skills: [],
	});

	useEffect(() => {
		handleFetchJobs();
	}, []);

	useEffect(() => {
		console.log(query);
	}, [query]);

	const handleFetchJobs = async () => {
		try {
			const response = await fetchJobsByQuery(query);

			if (response.status === 200) {
				setJobs(response.data.jobs || []);
			} else {
				console.error("Failed to fetch jobs:", response);
				setJobs([]);
			}
		} catch (error) {
			console.error("Error fetching jobs:", error);
			setJobs([]);
		}
	};

	return (
		<div>
			<Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
			<QueryWidget
				query={query}
				setQuery={setQuery}
				handleFetchJobs={handleFetchJobs}
			/>
			{jobs.map((job, index) => (
				<JobCard job={job} key={index} />
			))}
		</div>
	);
}

export default HomePage;

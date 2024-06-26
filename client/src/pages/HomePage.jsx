import { useEffect, useState } from "react";
import { fetchJobsByQuery } from "../api/Job";
import { Header } from "../components/Header";
import { QueryWidget } from "../components/QueryWidget";
import { JobCard } from "../components/JobCard";
import styles from './Home.module.css';

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
        console.log('Query updated:', query);
    }, [query]);

    const handleFetchJobs = async () => {
        try {
            const data = await fetchJobsByQuery(query);
            setJobs(data.jobs || []);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setJobs([]);
        }
    };

    return (
        <div className={styles.body}>
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <div className={styles.queryWidget}>
            <QueryWidget
                query={query}
                setQuery={setQuery}
                handleFetchJobs={handleFetchJobs}
            />
            </div>
            <div className={styles.jobCard}>
            {jobs.length > 0 ? (
                jobs.map((job, index) => (
                    <JobCard job={job} key={index} />
                ))
            ) : (
                <p>No jobs found</p>
            )}
            </div>
        </div>
    );
}

export default HomePage;

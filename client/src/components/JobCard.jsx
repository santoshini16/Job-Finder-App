import { useNavigate } from "react-router-dom";
import styles from "./JobCard.module.css";
import person from "../assets/person.png";
import price from "../assets/price.png";

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

    return (
        <div className={styles.cardContainer}>
            <img src={logoUrl} alt={altJobIcon} className={styles.logo} />
            <div className={styles.jobDetails}>
                <div className={styles.jobTitle}>{title}</div>
				<div className={styles.divOne}>
				<img src={person} style={{width:15,height:15,marginTop:2}}></img>
				<p className={styles.para}>11-50</p>
				<img src={price} style={{width:12,height:13,marginTop:4,marginLeft:10}}/>
				<div className={styles.salary}>{salary}</div>
                <div className={styles.location}> {location}</div>
				</div>
				<div className={styles.divTwo}>
				<div className={styles.locationType}>{locationType}</div>
                <div className={styles.jobType}>{jobType}</div>
				</div>
                
                {/* <div className={styles.duration}>Duration: {duration}</div> */}
            </div>
			<div>
			   <div className={styles.skills}>
                    {skills.map((skill, index) => (
                        <div key={index} className={styles.skill}>{skill}</div>
                    ))}
                </div>
				<button
                className={styles.viewDetailsBtn}
                onClick={() => navigate(`/job/${_id}`)}
            >
                View Details
            </button>
			</div>
        </div>
    );
};

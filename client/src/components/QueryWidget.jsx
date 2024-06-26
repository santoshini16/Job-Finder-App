import skills from "../data/skills";
import search from "../assets/search.png";
import styles from "./QueryWidget.module.css";

export const QueryWidget = ({ query, setQuery, handleFetchJobs }) => {
	const handleSkillChange = (skill) => {
		if (skill === "placeholder") {
			return;
		}
		if (!query.skills.includes(skill)) {
			setQuery({ ...query, skills: [...query.skills, skill] });
		}
	};

	const handleClearFilters = () => {
		setQuery({ title: "", skills: [] });
	};

	return (
		<div className={styles.searchContainer}>
    <div className={styles.inputContainer}>
        <img src={search} alt="search" className={styles.searchIcon} />
        <input
            type="text"
            placeholder="Type any job title"
            value={query.title}
            onChange={(e) => setQuery({ ...query, title: e.target.value })}
            className={styles.inputBar}
        />
    </div>
    <div className={styles.filterContainer}>
        <select onChange={(e) => handleSkillChange(e.target.value)} className={styles.selectSkills}>
            <option value="placeholder">Select Skill</option>
            {skills.map((skill, index) => (
                <option key={index} value={skill}>
                    {skill}
                </option>
            ))}
        </select>
        <div>
		<button
            onClick={() => {
                handleFetchJobs();
            }}
            className={styles.applyBtn}
        >
            Apply Filters
        </button>
        <button onClick={() => handleClearFilters()} className={styles.clearBtn}>
            Clear
        </button>
		</div>
        
    </div>
</div>

	);
};
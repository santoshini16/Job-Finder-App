import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';
// import UserAvatar from "../assets/random_Avatar.jpg";

export const Header = ({ currentUser, setCurrentUser }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.header}>
			<h1 className={styles.logo}>Jobfinder</h1>
			{currentUser && (
				<div className={styles.logoutContainer}>
					<button
						onClick={() => {
							setCurrentUser(false);
							localStorage.removeItem("token");
							navigate("/login");
						}} className={styles.logoutbtn}
					>
						Logout
					</button>
					<h4>Hello! Recruiter</h4>
					{/* <img src={UserAvatar} alt="" /> */}
				</div>
			)}
			{!currentUser && (
				<div className={styles.loginContainer}>
					<button
						onClick={() => {
							navigate("/login");
						}} className={styles.loginbtn}
					>
						Login
					</button>
					<button
						onClick={() => {
							navigate("/register");
						}} className={styles.registerbtn}
					>
						Register
					</button>
				</div>
			)}
		</div>
	);
};
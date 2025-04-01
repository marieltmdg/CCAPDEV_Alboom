import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main.jsx";
import styles from "./About.module.css";

function About() {
    return (
        <>
            <Header isAuth={true} />
            <Main>
                <div className={styles.mainContainer}>
                    <h1 className={`${styles.header} ${styles.one}`}>About This Project</h1>
                    <p className={styles.paragraph}>
                        This website is built using <strong className={styles.bold}>React</strong> for the frontend and <strong className={styles.bold}>Express.js</strong> for the backend.
                        It follows a full-stack JavaScript architecture, integrating a MongoDB database using <strong className={styles.bold}>Mongoose</strong>.
                        Authentication is managed via <strong className={styles.bold}>Passport.js</strong>, while <strong className={styles.bold}>Axios</strong> handles API communication between the frontend and backend.
                    </p>
                    
                    <h2 className={`${styles.header} ${styles.two}`}>Technologies Used</h2>
                    
                    <section>
                        <h3 className={`${styles.header} ${styles.three}`}>Core Dependencies</h3>
                        <ul className={styles.list}>
                            <li className={styles.orderedlist}><strong className={styles.bold}>Express</strong> - Web framework for Node.js</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>React</strong> - Frontend UI library</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>React Router</strong> - Client-side routing</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>Mongoose</strong> - ODM for MongoDB</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h3 className={`${styles.header} ${styles.three}`}>Backend & Database</h3>
                        <ul className={styles.list}>
                            <li className={styles.orderedlist}><strong className={styles.bold}>connect-mongo</strong> - MongoDB session store</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>cors</strong> - Enables Cross-Origin Resource Sharing</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>crypto</strong> - Provides cryptographic functions</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>dotenv</strong> - Manages environment variables</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>express-async-handler</strong> - Simplifies error handling</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>express-fileupload</strong> - Handles file uploads</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>express-session</strong> - Manages user sessions</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>Passport</strong> - User authentication</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>passport-local</strong> - Local authentication strategy</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h3 className={`${styles.header} ${styles.three}`}>Frontend & API Communication</h3>
                        <ul className={styles.list}>
                            <li className={styles.orderedlist}><strong className={styles.bold}>Axios</strong> - Handles HTTP requests</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h3 className={`${styles.header} ${styles.three}`}>Development Tools</h3>
                        <ul className={styles.list}>
                            <li className={styles.orderedlist}><strong className={styles.bold}>Vite</strong> - Fast frontend build tool</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>Nodemon</strong> - Auto-restarts backend during development</li>
                            <li className={styles.orderedlist}><strong className={styles.bold}>ESLint</strong> - Enforces code quality</li>
                        </ul>
                    </section>
                    
                    <p className={styles.paragraph}>
                        This project uses <strong className={styles.bold}>Vite</strong> for efficient frontend development, <strong className={styles.bold}>ESLint</strong> for maintaining clean code,
                        and <strong className={styles.bold}>Nodemon</strong> to streamline backend development. The combination of these tools ensures a robust and maintainable codebase.
                    </p>
                </div>
            </Main>
        </>
    );
}

export default About;
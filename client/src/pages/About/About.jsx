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
                    <h1>About This Project</h1>
                    <p>
                        This website is built using <strong>React</strong> for the frontend and <strong>Express.js</strong> for the backend.
                        It follows a full-stack JavaScript architecture, integrating a MongoDB database using <strong>Mongoose</strong>.
                        Authentication is managed via <strong>Passport.js</strong>, while <strong>Axios</strong> handles API communication between the frontend and backend.
                    </p>
                    
                    <h2>Technologies Used</h2>
                    
                    <section>
                        <h3>Core Dependencies</h3>
                        <ul>
                            <li><strong>Express</strong> - Web framework for Node.js</li>
                            <li><strong>React</strong> - Frontend UI library</li>
                            <li><strong>React Router</strong> - Client-side routing</li>
                            <li><strong>Mongoose</strong> - ODM for MongoDB</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h3>Backend & Database</h3>
                        <ul>
                            <li><strong>connect-mongo</strong> - MongoDB session store</li>
                            <li><strong>cors</strong> - Enables Cross-Origin Resource Sharing</li>
                            <li><strong>crypto</strong> - Provides cryptographic functions</li>
                            <li><strong>dotenv</strong> - Manages environment variables</li>
                            <li><strong>express-async-handler</strong> - Simplifies error handling</li>
                            <li><strong>express-fileupload</strong> - Handles file uploads</li>
                            <li><strong>express-session</strong> - Manages user sessions</li>
                            <li><strong>Passport</strong> - User authentication</li>
                            <li><strong>passport-local</strong> - Local authentication strategy</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h3>Frontend & API Communication</h3>
                        <ul>
                            <li><strong>Axios</strong> - Handles HTTP requests</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h3>Development Tools</h3>
                        <ul>
                            <li><strong>Vite</strong> - Fast frontend build tool</li>
                            <li><strong>Nodemon</strong> - Auto-restarts backend during development</li>
                            <li><strong>ESLint</strong> - Enforces code quality</li>
                        </ul>
                    </section>
                    
                    <p>
                        This project uses <strong>Vite</strong> for efficient frontend development, <strong>ESLint</strong> for maintaining clean code,
                        and <strong>Nodemon</strong> to streamline backend development. The combination of these tools ensures a robust and maintainable codebase.
                    </p>
                </div>
            </Main>
        </>
    );
}

export default About;

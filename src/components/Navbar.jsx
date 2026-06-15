function Navbar({ darkMode, setDarkMode }) {
    return (
    <nav className="navbar">
        <h1>Student Productivity Hub</h1>

        <button
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    </nav>
    );
}

export default Navbar;
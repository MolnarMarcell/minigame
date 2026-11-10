import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board.jsx";

const THEME_STORAGE_KEY = "minigame-theme";

function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        return savedTheme === "light" ? "light" : "dark";
    });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    return (
        <>
            <button
                className="theme-toggle"
                type="button"
                aria-label={`Váltás ${theme === "dark" ? "világos" : "sötét"} módra`}
                aria-pressed={theme === "light"}
                onClick={() => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
            >
                {theme === "dark" ? "Világos mód" : "Sötét mód"}
            </button>
            <h1>Amőba</h1>
            <p className="subtitle">Egy gyors kör, egy kis stratégia.</p>
            <Board />
        </>
    );
}

export default App;

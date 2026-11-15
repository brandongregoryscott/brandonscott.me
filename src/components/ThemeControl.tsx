import { useEffect, useState, type ChangeEvent } from "react";

type Theme = "system" | "light" | "dark";

export default function ThemeControl() {
    const [theme, setTheme] = useState<Theme>("system");

    useEffect(() => {
        const savedTheme = document.documentElement.dataset.theme;
        if (savedTheme === "light" || savedTheme === "dark") {
            setTheme(savedTheme);
        }
    }, []);

    const handleChangeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
        const theme = event.target.value as Theme;

        setTheme(theme);

        document.documentElement.dataset.theme = theme;

        if (theme === "system") {
            delete document.documentElement.dataset.theme;
        }

        try {
            if (theme === "system") {
                localStorage.removeItem("site-theme");
                return;
            }

            localStorage.setItem("site-theme", theme);
        } catch {}
    };

    return (
        <label className="theme-control">
            Theme
            <select
                id="theme"
                aria-label="Color theme"
                value={theme}
                onChange={handleChangeTheme}>
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label>
    );
}

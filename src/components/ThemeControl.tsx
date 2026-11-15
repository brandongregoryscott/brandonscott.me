import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

export default function ThemeControl() {
    const [theme, setTheme] = useState<Theme>("system");

    useEffect(() => {
        const savedTheme = document.documentElement.dataset.theme;
        if (savedTheme === "light" || savedTheme === "dark") {
            setTheme(savedTheme);
        }
    }, []);

    function changeTheme(value: Theme) {
        setTheme(value);
        if (value === "system") {
            delete document.documentElement.dataset.theme;
        } else {
            document.documentElement.dataset.theme = value;
        }
        try {
            if (value === "system") localStorage.removeItem("site-theme");
            else localStorage.setItem("site-theme", value);
        } catch {}
    }

    return (
        <label className="theme-control">
            Theme
            <select
                id="theme"
                aria-label="Color theme"
                value={theme}
                onChange={(event) => changeTheme(event.currentTarget.value as Theme)}>
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label>
    );
}

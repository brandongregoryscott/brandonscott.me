import type { ChangeEvent } from "react";
import { useEffect, useRef } from "react";

type Theme = "dark" | "light" | "system";

function ThemeControl() {
    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const savedTheme = document.documentElement.dataset.theme;

        if (
            selectRef.current != null &&
            (savedTheme === "light" || savedTheme === "dark")
        ) {
            selectRef.current.value = savedTheme;
        }
    }, []);

    const handleChangeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
        const theme = event.target.value as Theme;

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
                aria-label="Color theme"
                defaultValue="system"
                id="theme"
                onChange={handleChangeTheme}
                ref={selectRef}>
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label>
    );
}

export { ThemeControl };

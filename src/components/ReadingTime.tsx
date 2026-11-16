import type { ChangeEvent } from "react";
import { useId, useState } from "react";
import "./ReadingTime.css";

function ReadingTime() {
    const id = useId();
    const [words, setWords] = useState(1000);
    const [wordsPerMinute, setWordsPerMinute] = useState(200);
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

    const handleChangeWords = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.valueAsNumber;

        setWords(
            Number.isFinite(value)
                ? Math.min(100000, Math.max(1, Math.round(value)))
                : 1
        );
    };

    const handleChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
        setWordsPerMinute(event.currentTarget.valueAsNumber);
    };

    return (
        <section aria-labelledby={`${id}-title`} className="reading-time">
            <h3 id={`${id}-title`}>Reading time calculator</h3>
            <div className="calculator-fields">
                <label htmlFor={`${id}-words`}>
                    Word count
                    <input
                        id={`${id}-words`}
                        max="100000"
                        min="1"
                        onChange={handleChangeWords}
                        step="1"
                        type="number"
                        value={words}
                    />
                </label>
                <label htmlFor={`${id}-speed`}>
                    Reading speed: {wordsPerMinute} words/minute
                    <input
                        id={`${id}-speed`}
                        max="500"
                        min="100"
                        onChange={handleChangeSpeed}
                        step="25"
                        type="range"
                        value={wordsPerMinute}
                    />
                </label>
            </div>
            <p
                aria-atomic="true"
                aria-live="polite"
                className="calculator-result"
                role="status">
                About {minutes} {minutes === 1 ? "minute" : "minutes"} to read.
            </p>
            <noscript>Enable JavaScript to adjust the calculator.</noscript>
        </section>
    );
}

export { ReadingTime };

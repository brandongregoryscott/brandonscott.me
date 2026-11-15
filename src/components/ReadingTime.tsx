import { useId, useState } from "react";
import "./ReadingTime.css";

export default function ReadingTime() {
    const id = useId();
    const [words, setWords] = useState(1000);
    const [wordsPerMinute, setWordsPerMinute] = useState(200);
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

    return (
        <section className="reading-time" aria-labelledby={`${id}-title`}>
            <h3 id={`${id}-title`}>Reading time calculator</h3>
            <div className="calculator-fields">
                <label htmlFor={`${id}-words`}>
                    Word count
                    <input
                        id={`${id}-words`}
                        type="number"
                        min="1"
                        max="100000"
                        step="1"
                        value={words}
                        onChange={(event) => {
                            const value = event.currentTarget.valueAsNumber;
                            setWords(
                                Number.isFinite(value)
                                    ? Math.min(
                                          100000,
                                          Math.max(1, Math.round(value))
                                      )
                                    : 1
                            );
                        }}
                    />
                </label>
                <label htmlFor={`${id}-speed`}>
                    Reading speed: {wordsPerMinute} words/minute
                    <input
                        id={`${id}-speed`}
                        type="range"
                        min="100"
                        max="500"
                        step="25"
                        value={wordsPerMinute}
                        onChange={(event) =>
                            setWordsPerMinute(event.currentTarget.valueAsNumber)
                        }
                    />
                </label>
            </div>
            <p
                className="calculator-result"
                role="status"
                aria-live="polite"
                aria-atomic="true">
                About {minutes} {minutes === 1 ? "minute" : "minutes"} to read.
            </p>
            <noscript>Enable JavaScript to adjust the calculator.</noscript>
        </section>
    );
}

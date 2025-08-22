const formatDate = (date: Date): string =>
    date.toLocaleDateString("en-US", {
        dateStyle: "medium",
    });

export { formatDate };

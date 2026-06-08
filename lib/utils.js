export function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function truncate(text, length = 100) {
    if (!text) return "";
    return text.length > length ?
        text.substring(0, length) + "..." :
        text;
}
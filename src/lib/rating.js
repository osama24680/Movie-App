// Colour class for a TMDB score (0-10)
export function ratingClass(score) {
    if (score >= 7) return "rating rating--high"
    if (score >= 5) return "rating rating--mid"
    return "rating rating--low"
}

export const yearOf = (item) => (item?.release_date || item?.first_air_date || "").split("-")[0]

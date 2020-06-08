export const calculateTimeLeft = (difference: number) => {
    let timeLeft;
    if (difference) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24)) || undefined;
        const hours = `0${Math.floor((difference / (1000 * 60 * 60)) % 24)}`.slice(-2);
        const minutes = `0${Math.floor((difference / 1000 / 60) % 60)}`.slice(-2);
        const seconds = `0${Math.floor((difference / 1000) % 60)}`.slice(-2);

        timeLeft = {
            days,
            hours,
            minutes,
            seconds
        };
    }
    return timeLeft;
};
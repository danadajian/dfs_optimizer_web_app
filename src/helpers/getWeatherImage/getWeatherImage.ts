const cloudy = require("../../icons/cloudy.ico") as any;
const partlyCloudy = require("../../icons/partlycloudy.ico") as any;
const rainy = require("../../icons/rainy.ico") as any;
const snowy = require("../../icons/snowy.ico") as any;
const stormy = require("../../icons/stormy.ico") as any;
const sunny = require("../../icons/sunny.ico") as any;

export const getWeatherImage = (caseSensitiveForecast: string): any => {
    const forecast = caseSensitiveForecast.toLowerCase();
    return (forecast) &&
        (forecast.includes('partly')) ? partlyCloudy :
            (forecast.includes('cloud') || forecast.includes('fog')) ? cloudy :
                (forecast.includes('storm') || forecast.includes('thunder')) ? stormy :
                    (forecast.includes('rain') || forecast.includes('shower')) ? rainy :
                        (forecast.includes('snow') || forecast.includes('flurr')) ? snowy :
                            (forecast.includes('sun') || forecast.includes('clear')) ? sunny : undefined;
}
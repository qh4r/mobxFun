import {observable, computed, action, useStrict} from "mobx";

useStrict(true); // powoduje ze do modyfikacji statu wymagane jest uzywanie akcji

export default class Temperature {
    @observable unit = "C";
    @observable temperatureCelcius = 30;

    @computed get temperatureKelvin() {
        return this.temperatureCelcius * (9 / 5) + 32;
    }

    @computed get temperatureFarrenherit() {
        return this.temperatureCelcius + 273.15;
    }

    @computed get temperature() {
        switch (this.unit) {
            case "K" :
                return `${this.temperatureKelvin} K`;
            case "C" :
                return `${this.temperatureCelcius} C`;
            case "F" :
                return `${this.temperatureFarrenherit} F`;
        }
    }

    // waznym plusem akcji jest to ze wrapuja wykonanie w transaction(() => {}) - co sprawia ze sa atomowe
    // state odswiezy sie dopiero po akcji i wszystkich zmianach w niej, gdybysmy zmieniali state poza akcja to kazda zmiana
    // powodowala by re rendering
    @action setUnit(unit) {
        this.unit = unit;
    }

    @action setCelciusTemperature(temp) {
        this.temperatureCelcius = temp;
    }
}

//asMap pozwala tworzc obserwable slowniki

// tak zwany observable map - po prostu array rpzekazywany zamaist obiektu - reaguje na zmiany zawartosci
export let tempsRecord = observable([]);


//ALTERNATYWNA SKLADNIA BEZ DEKORATOROW
//COMPUTED VALUES DZIALAJA TO FUNKCJE i tak trzeba sie do nich odwolywac

// export let T = observable({
//     unit: "C",
//     temperatureCelcius: 30,
//     temperatureKelvin: function () {
//         return this.temperatureCelcius * (9 / 5) + 32;
//     },
//     temperatureFarrenherit: function () {
//         return this.temperatureCelcius + 273.15;
//     },
//     temperature: function () {
//         switch (this.unit) {
//             case "K" :
//                 return `${this.temperatureKelvin()} K`;
//             case "C" :
//                 return `${this.temperatureCelcius} C`;
//             case "F" :
//                 return `${this.temperatureFarrenherit()} F`;
//         }
//     }
// })
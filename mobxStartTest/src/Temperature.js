import {observable, computed} from "mobx";

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
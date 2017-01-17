import {observable, computed, action, useStrict, when, reaction} from "mobx";

useStrict(true); // powoduje ze do modyfikacji statu wymagane jest uzywanie akcji

export default class Temperature {
    @observable unit = "C";
    @observable temperatureCelcius = 30;
    @observable location = '';
    @observable isFarenheit = false;

    constructor() {

        // WHEN ODPALA SIE TYLKO RAZZZ!!!!
        when(
            () => this.unit == 'F',
            () => action(() => {this.isFarenheit = true; console.log(this)})()
        );

        // TO WHEN ODPALA SIE TUZ PRZY ZARENDEROWANIU Z USTAWIONYM C
        when(
            () => this.unit != 'F',
            () => action(() => {this.isFarenheit = false; console.log(this)})()
        );

        // reaction reaguje na zmiany danego observabla
        // jest jeszcze autorun - ktory jest troche magiczny
        reaction(
            () => this.unit,
            () => action(() => {this.isFarenheit = this.unit == 'F'})()
        )
    }

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
            default:
                return `${this.temperatureFarrenherit} F`;
        }
    }

    // waznym plusem akcji jest to ze wrapuja wykonanie w transaction(() => {}) - co sprawia ze sa atomowe
    // state odswiezy sie dopiero po akcji i wszystkich zmianach w niej, gdybysmy zmieniali state poza akcja to kazda zmiana
    // powodowala by re rendering
    @action setUnit(unit) {
        this.unit = unit;
    }

    @action setLocation(location) {
        this.location = location;
    }

    @action clearLocation() {
        this.location = '';
    }

    @action setCelciusTemperature(temp) {
        this.temperatureCelcius = temp;
    }
}

//asMap pozwala tworzc obserwable slowniki


class TemperatureRecord {
    @observable value;

    constructor(location, value) {
        this.location = location;
        this.value = value;
    }

    @action increase() {
        let [val, unit] = this.value.split(' ');

        // to nie zadziala bo akcja nie modyfikuje stanu tylko robi to setTimeout w kolejnym cyklu!!!!
        setTimeout(() => {
            action(() => {
                this.value = `${1 + Number(val)} ${unit}`
            })(); // DEKLARACJA I WYWOLANIE AKCJI
            // mozna by to osobno zadeklarowac
        }, 500);

        // TAK SAMO JAK SET TIMEOUT DZIALAJA PROMISY - .then(action(/*modyfikuj state*/))
    }
}

// tak zwany observable map - po prostu array rpzekazywany zamaist obiektu - reaguje na zmiany zawartosci
export let tempsRecord = observable([]);

// akcja dodana w strict mode
tempsRecord.add = action(function (l, t) {
    this.push(new TemperatureRecord(l, t));
});


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
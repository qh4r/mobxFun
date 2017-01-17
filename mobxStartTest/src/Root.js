// create-react-app my-app --scripts-version custom-react-scripts

import React from 'react';
import SimpleStore from './SimpleStore';
import ComputedVals, {TempRow} from './ComputedVals';
import Devtools from 'mobx-react-devtools';
import {observer, Provider} from 'mobx-react'
import './Root.css';

import {AppStore} from './SImpleStore_store';
const store = new AppStore();

import Temperature, {tempsRecord} from './Temperature';
import {action} from "mobx";

const temperature = new Temperature();


// AKCJE DEKLAROWANE POZA OBIEKTEM TAKZE MOGA MODYFIKOWAC STAN -- DZIALA W USE STRICT
let actionBoilerplate = action((state, key, value) => {
    state[key] = value;
});

let tempUnitAction = actionBoilerplate.bind(null, temperature, 'unit');
window.tempUnitAction = tempUnitAction; // TA AKCJA POWODUJE ZE Z KONSOLI MOZNA UZYWAC TEJ METODY Z JEDNOSTKA


// SKLADNIA DLA OBSERVERA BEZ DEKORATOROW - w tablicy rpzekazujemy story ktore maja byc przekazane do propsow
var TempsList = observer(['temps', 'tempUnitAction'], ({temps, tempUnitAction}) => {
    return (
        <div>
            <h2>Mozna obserwowac 1 store w 2 komponentach oraz 2 story w 1!</h2>
            <ul>
                {temps.map((x, i) => <TempRow temp={x} key={i}/>).reverse()}
            </ul>
            <p>ten guzik jest bez sensu ale pokazuje ze wolne akcje takze mozna przekazac do providera i wydobywac przez parametry w stringach</p>
            <button onClick={() => tempUnitAction('C')}>selected unit to Celcius</button>
        </div>
    )
});


export default function () {
    return (
        // PROVIDER PRZEKAZUJE STORY WSZYSTKIM DZIECIOM KTORE O NIE POPROSZA
        <Provider temps={tempsRecord} tempUnitAction={tempUnitAction}>
            <div id="container">
                <Devtools/>
                <SimpleStore store={store}/>
                <ComputedVals store={temperature}/>
                <TempsList/>
                {/*<ComputedVals temps={tempsRecord} store={temperature}/>*/}
                {/*<TempsList temps={tempsRecord} />*/}
            </div>
        </Provider>
    )
}
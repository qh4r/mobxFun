// create-react-app my-app --scripts-version custom-react-scripts

import React from 'react';
import SimpleStore from './SimpleStore';
import ComputedVals from './ComputedVals';
import Devtools from 'mobx-react-devtools';
import {observer} from 'mobx-react'
import './Root.css';

import {AppStore} from './SImpleStore_store';
const store = new AppStore();

import Temperature, {tempsRecord} from './Temperature';

const temperature = new Temperature();

// SKLADNIA DLA OBSERVERA BEZ DEKORATOROW
var TempsList = observer(({temps}) => {
    return (
        <div>
            <h2>Mozna obserwowac 1 store w 2 komponentach oraz 2 story w 1!</h2>
            <ul>
                {temps.map((x,i) => <li key={i}>{x}</li>).reverse()}
            </ul>
        </div>
    )
});


export default function () {
    return (
        <div id="container">
            <Devtools/>
            <SimpleStore store={store}/>,
            <ComputedVals temps={tempsRecord} store={temperature}/>
            <TempsList temps={tempsRecord} />
        </div>
    )
}
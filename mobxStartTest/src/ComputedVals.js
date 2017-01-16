import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class ComputedVals extends Component {
    constructor(props){
        super(props);

        this.store = props.store;
        this.temps = props.temps;
    }

    render(){
        return (
            <div>
                <p>
                    <input type="text" value={this.store.temperatureCelcius} onChange={({target: {value}}) => this.store.temperatureCelcius = +value || 0}/>
                </p>
                <select value={this.store.unit} onChange={(e) => this.onSelctionChange(e)}>
                    <option value="K">K</option>
                    <option value="C">C</option>
                    <option value="F">F</option>
                </select>
                <p>temperatura wyjsciowa: {this.store.temperature}</p>
                <ul>
                    {this.temps.map((x,i) => <li key={i}>{x}</li>)}
                </ul>
            </div>
        )
    }

    onSelctionChange(e) {
        this.store.unit = e.target.value;
        this.temps.push(this.store.temperature);
    }
}
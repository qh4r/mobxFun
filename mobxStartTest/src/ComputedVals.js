import React, {Component} from 'react';
import {observer} from 'mobx-react';


@observer
export class TempRow extends Component {
    static propTypes = {
        // temp: React.propTypes.string
    }

    constructor(props) {
        super(props);
        this.props = props
    }

    render(props) {
        console.log(props);
        return (
            <li onClick={() => this.props.temp.increase()}><span style={{color: 'crimson'}}>{this.props.temp.location}</span> -> {this.props.temp.value} | {/\d\d:\d\d:\d\d/.exec(new Date)[0]}</li>
        )
    }

}

@observer(['temps'])
export default class ComputedVals extends Component {
    constructor(props) {
        super(props);

        this.store = props.store;
        this.temps = props.temps;
    }

    render() {
        return (
            <div>
                <p>
                    <input type="text" value={this.store.temperatureCelcius}
                           onChange={({target: {value}}) => this.store.setCelciusTemperature(+value || 0)}/>
                    <select value={this.store.unit} onChange={(e) => this.onSelctionChange(e)}>
                        <option value="K">K</option>
                        <option value="C">C</option>
                        <option value="F">F</option>
                    </select>
                </p>
                <p>
                    Lokalizacja: <input type="text" value={this.store.location} onInput={({target: {value}}) => this.store.setLocation(value)}/> <button onClick={() => this.onStore()}>Zapisz</button>
                </p>

                <p style={this.store.isFarenheit ? {color: 'green'} : {}}>temperatura wyjsciowa: {this.store.temperature}</p>
                <ul>
                    {this.temps.map((x, i) => <TempRow temp={x} key={i}/>)}
                    {/*{this.temps.map((x, i) => <li key={i}>{x.value}</li>)}*/}
                </ul>
            </div>
        )
    }

    onSelctionChange({target: {value}}) {
        this.store.setUnit(value);
    }

    onStore() {
        this.temps.add(this.store.location, this.store.temperature);
        this.store.clearLocation();
    }
}
import React, {Component} from 'react';
import './App.sass';
import {observer} from 'mobx-react'

@observer
class App extends Component {
    static propTypes = {
        store: React.PropTypes.shape({
            count: React.PropTypes.number.isRequired,
            handleAdd: React.PropTypes.func.isRequired,
            handleSub: React.PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        return (
            <div className="app-main">
                <div>
                    Count: {this.props.store.count}
                </div>
                <div className="counter">
                    <button onClick={this.props.store.handleAdd}>Add</button>
                    <button onClick={this.props.store.handleSub}>Sub</button>
                </div>
            </div>
        );
    }
}

export default App;

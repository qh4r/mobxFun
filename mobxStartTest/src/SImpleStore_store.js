import {observable, action} from 'mobx';

export class AppStore {
    @observable count = 0;

    @action handleAdd = () => {
        this.count++;
    };

    @action handleSub = () => {
        this.count--;
    };
}
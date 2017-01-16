import {observable} from 'mobx';

export class AppStore {
    @observable count = 0;

    handleAdd = () => {
        this.count++;
    };

    handleSub = () => {
        this.count--;
    };
}
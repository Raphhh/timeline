import Vue from 'vue';

import TimelineComponent from "./components/TimeLine";
import {TimelineVuePlugin} from "./TimelineVuePlugin";


TimelineVuePlugin.init(Vue); //todo mettre ça ailleurs.


//todo faire une démo ailleurs.

let v = new Vue({
    el: '#app',
    template: `<timeline-component :url="url" />`,
    data: {
        url: 'data/middle_age.fr.json'
    },
    components: {
        TimelineComponent
    }
});
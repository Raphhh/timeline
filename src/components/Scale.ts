import Vue from 'vue';
import {Period} from "../Period";

export default Vue.extend({
    name: 'scale-component',
    template: `
        <li class="timeline-scale">
            <span v-if="scale.title" class="timeline-scale-title">{{scale.title}}</span>
            <span v-if="scale.startDate" class="timeline-scale-dates">
                <span class="timeline-scale-start-date">{{scale.startDate}}</span>
            </span>
        </li>
    `,
    props: ['period'],
    computed: {
        scales: function () {
            //
        }
    }
});
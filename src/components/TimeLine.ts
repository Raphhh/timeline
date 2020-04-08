import Vue from 'vue';
import {Period} from "../Period";
import PeriodComponent from "./Period";
import ScaleComponent from "./Scale";

export default Vue.extend({
    name: 'timeline-component',
    template: `
        <div class="timeline">
            <scale-component v-if="period" :period="period" />
            <ul v-if="period">
                <period-component :period="period" />
            </ul>
        </div>
    `,
    props: ['url'],
    data() {
        return {
            period: null
        }
    },
    created() {
        this.$timelinePlugin.requestPeriod(this.url).then((period: Period) => {
            this.period = period;
        });
    },
    components: {
        PeriodComponent,
        ScaleComponent,
    }
});
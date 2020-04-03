import Vue from 'vue';
import {Period} from "../Period";
import PeriodComponent from "./Period";

export default Vue.extend({
    name: 'timeline-component',
    template: `
        <div class="timeline">
            <ul v-if="period" class="list-unstyled">
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
        this.$periodApi.request(this.url).then((period: Period) => {
            console.log(period);
            this.period = period;
        });
    },
    components: {
        PeriodComponent
    }
});
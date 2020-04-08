import Vue from 'vue';
import {Period} from "../Period";
import PeriodComponent from "./Period";
import {PeriodJsonInterface} from "../PeriodJsonInterface";

function scale(start: number, final: number, quantum: number): Period {
    let end: number = start;

    let periodJson: PeriodJsonInterface = {
        start_date: start.toString(),
        end_date: final.toString(),
        children: []
    };

    while ((end + 1)%quantum) {
        ++end;
    }

    while (end - quantum <= final) {
        periodJson.children.push({
            title: start.toString(),
            start_date: start.toString(),
            end_date: end <= final ? end.toString() : final.toString()
        });

        start = end + 1;
        end += quantum;
    }

console.log(periodJson);
    return new Period(periodJson);
}

export default Vue.extend({
    name: 'scale-component',
    template: `
        <ul v-if="scales" class="timeline-scales">
            <period-component v-for="scale in scales" :period="scale" />
        </ul>
    `,
    props: ['period'],
    computed: {
        scales: function(): Period[]|null {

            if (!this.period) {
                return null;
            }

            if (!this.period.startDate) {
                return null;
            }

            if (!this.period.endDate) {
                return null;
            }

            //todo  l'échelle à une précision au siècle seulement.
            return scale(
                //todo le cast de ts ne semble pas marcher...?
                parseInt(this.period.startDate.year),
                parseInt(this.period.endDate.year),
                100
            ).children;
        }
    },
    components: {
        PeriodComponent,
    }
});
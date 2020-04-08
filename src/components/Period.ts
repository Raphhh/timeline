import Vue from 'vue';
import {PeriodCss} from "../PeriodCss";

export default Vue.extend({
    name: 'period-component',
    template: `
        <li class="timeline-period" 
            v-bind:id="period.id"
            v-bind:class="periodClass"
            v-bind:style="periodStyle"
            v-bind:data-url="period.url" 
        >
            <div class="timeline-period-data">
                <span v-if="period.title" class="timeline-period-title">{{period.title}}</span>
                <span v-if="period.startDate" class="timeline-period-dates">
                    (<span class="timeline-period-start-date">{{period.startDate}}</span><span v-if="period.endDate" class="timeline-period-dates-separator">-</span><span v-if="period.endDate" class="timeline-period-end-date">{{period.endDate}}</span>)
                </span>
            </div>
            <ul v-if="period.children.length" class="timeline-period-children">
                <period-component v-for="child in period.children" :period="child" />
            </ul>
        </li>
    `,
    props: ['period'],
    computed: {
        periodClass: function() {
            return {
                'timeline-period-without-child': !this.period.children.length,
                'timeline-period-with-relative-start-date': this.period.relativeStartDate && this.period.relativeStartDate.unix,
                'timeline-period-without-title': !this.period.title,
            }
        },
        periodStyle: function() {
            return this.$timelinePlugin.buildStyleForPeriod(this.period);
        }
    }
});
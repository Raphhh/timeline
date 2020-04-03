import Vue from 'vue';

export default Vue.extend({
    name: 'period-component',
    template: `
        <li class="timeline-period" v-bind:id="period.id" v-bind:class="periodClass" v-bind:style="periodStyle">
            <div class="timeline-period-data">
                <span v-if="period.title" class="timeline-period-title">{{period.title}}</span>
                <span v-if="period.startDate" class="timeline-period-dates">
                    (
                    <span class="timeline-period-start-date">
                        {{period.startDate}}    
                    </span>
                    <span v-if="period.endDate" class="timeline-period-dates-separator">
                        -
                    </span>
                    <span v-if="period.endDate" class="timeline-period-end-date">
                        {{period.endDate}}    
                    </span>
<!--                    <span v-if="period.relativeStartDate" class="timeline-period-relative-start-date">-->
<!--                        [{{period.relativeStartDate}}]-->
<!--                    </span>-->
<!--                    <span v-if="period.duration" class="timeline-period-duration">-->
<!--                        ({{period.duration}})-->
<!--                    </span>-->
                    )
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
            }
        },
        periodStyle: function() {
            let scale: number = 0.0000001;
            console.log('=====', this.period.title, this.period.relativeStartDate ? (this.period.relativeStartDate.unix * scale) : 0);
            return {
                'left': this.period.relativeStartDate ? ((this.period.relativeStartDate.unix * scale) + 'px'): 0,
                'width': this.period.duration ? ((this.period.duration.unix * scale) + 'px') : 'inherit',
            }
        }
    }
});
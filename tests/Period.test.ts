import { assert } from 'chai';
import 'mocha';
import { Period } from '../src/Period';

describe('Period', function() {
    it('parent is null', function() {
        let period = new Period({});
        assert.isNull(period.parent);
    });

    it('parent is not null', function() {
        let period1 = new Period({});
        let period2 = new Period({}, period1);
        assert.strictEqual(period2.parent, period1);
    });


    it('startDate is null', function() {
        let period = new Period({});
        assert.isNull(period.startDate);
    });

    it('startDate is date', function() {
        let period = new Period({start_date: '2000-01-01'});
        assert.strictEqual(period.startDate.toISOString(), 'Sat, 01 Jan 2000 00:00:00 GMT');
    });

    it('startDate is year', function() {
        let period = new Period({start_date: '2000'});
        assert.strictEqual(period.startDate.toISOString(), 'Sat, 01 Jan 2000 00:00:00 GMT');
    });


    it('relativeStartDate with empty start_date', function() {
        let period = new Period({});
        assert.isNull(period.relativeStartDate);
    });

    it('relativeStartDate with own date', function() {
        let period = new Period({start_date: '2000'});
        assert.strictEqual(period.relativeStartDate.toString(), 'Sat, 01 Jan 2000 00:00:00 GMT');
    });


    it('relativeStartDate with parent date', function() {
        let period1 = new Period({start_date: '2000'});
        let period2 = new Period({start_date: '2002'}, period1);
        assert.strictEqual(period2.relativeStartDate.unix(), 0);
    });


    it('endDate is null', function() {
        let period = new Period({});
        assert.isNull(period.endDate);
    });

    it('endDate is date', function() {
        let period = new Period({end_date: '2000-01-01'});
        assert.strictEqual(period.endDate.toISOString(), 'Sat, 01 Jan 2000 00:00:00 GMT');
    });

    it('endDate is year', function() {
        let period = new Period({end_date: '2000'});
        assert.strictEqual(period.endDate.toISOString(), 'Sat, 01 Jan 2000 00:00:00 GMT');
    });


    it('children is not set and empty', function() {
        let period = new Period({});
        assert.isArray(period.children);
        assert.strictEqual(period.children.length, 0);
    });

    it('children is set and empty', function() {
        let period = new Period({children: []});
        assert.isArray(period.children);
        assert.strictEqual(period.children.length, 0);
    });

    it('children is not empty', function() {
        let period1 = new Period({});
        let period2 = new Period({children: [period1]});
        assert.isArray(period2.children);
        assert.strictEqual(period2.children.length, 1);
        assert.strictEqual(period2.children[0].parent, period2);
    });
});

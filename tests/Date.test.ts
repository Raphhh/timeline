import { assert } from 'chai';
import 'mocha';
import { Date } from '../src/Date';

describe('Date', function() {
    
    it('value is date', function() {
        let date = new Date('2000-01-01');
        assert.strictEqual(date.value, '2000-01-01');
        assert.strictEqual(date.toISOString(), '2000-01-01T00:00:00.000Z');
        assert.strictEqual(date.unix(), 946684800);
    });

    it('value is year', function() {
        let date = new Date('2000');
        assert.strictEqual(date.value, '2000');
        assert.strictEqual(date.toISOString(), '2000-01-01T00:00:00.000Z');
        assert.strictEqual(date.unix(), 946684800);
    });

    it('value is 0', function() {
        let date = new Date('0');
        assert.strictEqual(date.value, '0');
        assert.strictEqual(date.toISOString(), '0000-01-01T00:00:00.000Z');
        assert.strictEqual(date.unix(), -62167219200);
    });

    it('value is 0001', function() {
        let date = new Date('0001');
        assert.strictEqual(date.value, '0001');
        assert.strictEqual(date.toISOString(), '0001-01-01T00:00:00.000Z');
        assert.strictEqual(date.unix(), -62135596800);
    });

    it('value is 01', function() {
        let date = new Date('01');
        assert.strictEqual(date.value, '01');
        assert.strictEqual(date.toISOString(), '0001-01-01T00:00:00.000Z');
        assert.strictEqual(date.unix(), -62135596800);
    });

    it('value is 1', function() {
        let date = new Date('1');
        assert.strictEqual(date.value, '1');
        assert.strictEqual(date.toISOString(), '0001-01-01T00:00:00.000Z');
        assert.strictEqual(date.unix(), -62135596800);
    });

    it('value is -1', function() {
        assert.throws(() => new Date('-1'), 'BC dates are not supported');
    });

});

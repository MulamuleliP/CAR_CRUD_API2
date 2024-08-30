import assert from 'assert';
import { countNissansFromCk } from '../nissanFromCk.js';

describe('Nissan from CK', () => {
    it('should return the correct count of Nissans with registration starting with CK', function() {
        assert.equal(countNissansFromCk(), 1); 
    });
});

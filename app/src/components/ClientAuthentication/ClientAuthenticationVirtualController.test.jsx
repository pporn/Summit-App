import { authUser } from './ClientAuthenticationVirtualController';

const correctPayload = {
    name: 'Chen Yang',
    dob: '1998-06-29',
};

const incorrectPayload = {
    name: 'Chen Yang',
    dob: '1998-06-20',
};

describe('authUser', () => {
    it('Auth with correct data', (done) => {
        const callback = (data) => {
            expect(data.authenticated).toBe(true);
            done();
        };

        authUser(correctPayload, callback);
    });
});

describe('authUser', () => {
    it('Auth with incorrect data', (done) => {
        const callback = (data) => {
            expect(data.authenticated).toBe(false);
            done();
        };

        authUser(incorrectPayload, callback);
    });
});



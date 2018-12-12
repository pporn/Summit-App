import  authEmployee  from './EmployeeAuthenticationVirtualController';

const correctPayload = {
    email: 'admin@summit-app.com',
    password: 'summit-app',
};

const incorrectPayload = {
    email: 'Chen Yang',
    password: '1998-06-20',
};

describe('authEmployee', () => {
    it('Auth with correct data', (done) => {
        const callback = (data) => {
            expect(data.authenticated).toBe(true);
            done();
        };

        authEmployee(correctPayload, callback);
    });
});

describe('authEmployee', () => {
    it('Auth with incorrect data', (done) => {
        const callback = (data) => {
            expect(data.authenticated).toBe(false);
            done();
        };

        authEmployee(incorrectPayload, callback);
    });
});



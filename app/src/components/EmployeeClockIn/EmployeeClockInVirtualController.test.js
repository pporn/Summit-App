import clockIn from './EmployeeClockInVirtualController';

const correctInfo = {
    email: 'admin@summit-app.com',
    password: 'summit-app',
};

const incorrectInfo = {
    email: 'admin@summit-app.com',
    password: 'summit-pp',
};

describe('clockIn', () => {
    it('Clock in with correct info', () => {
        const callback = (isSuccess, data) => {
            expect(isSuccess).toBe(true);
        };

        clockIn(correctInfo, callback);
    });

    it('Clock in with incorrectInfo', () => {
        const callback = (isSuccess, data) => {
            expect(isSuccess).toBe(false);
        };

        clockIn(incorrectInfo, callback);
    });

});

import addUser from './ClientRegistrationVirtualController';

const payload ={
    first_name: 'node',
    last_name: 'test',
    dob: '1970-01-01',
};

describe('addUser', () => {
    it('test add user', () => {
        const callback = (isSuccess, data) => {
            expect(isSuccess).toBe(true);
        };

        addUser(payload, callback);
    });
});

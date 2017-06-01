const expect = require('expect');

const {User} = require('./users');

describe('USers', () => {
    var users;

    beforeEach(() => {
        users = new User();

        users.users = [{
            id: '1',
            name: 'Mike', 
            room: 'Node course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node course'
        }];
    });

    it('Should add a user', () => {
        var users = new User();

        var user = {
            id: '112',
            name: 'Inthra',
            room: 'Kalaimagal'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user])
    })

    it('Should return names for Node course', () => {
        var userList = users.getUserList('Node course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('Should return names for React course', () => {
        var userList = users.getUserList('React course');

        expect(userList).toEqual(['Jen']);
    });

    it('Should remove a user', () => {
        var removeUser = users.removeUser('1');

        expect(removeUser.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a user', () => {
        var removeUser = users.removeUser('14');

        expect(removeUser).toBe(undefined);
    });

    it('Should find a user', () => {
        var user = users.getUser('1');

        expect(user.id).toBe('1');
    });

    it('Should not find a user', () => {
        var user = users.getUser('14');

        expect(user).toBe(undefined);
    });
})

class User {
    constructor (){
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};

        this.users.push(user);

        return user;
    }

    removeUser(id) {
        var user = this.users.filter((user) => user.id === id)[0];
        
        if(user){
            this.users = this.users.filter((user) => user.id != id);
        }
        // var updatedUsers = this.users.filter((user) => user.id != id);

        return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
        // return user;
    }

    getUserByName (name) {
        return this.users.filter((user) => user.name === name)[0];
    }

    getUserList(room){ 
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {User};

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDesc(){
//         return `${this.name} is ${this.age} years old.`
//     }
// }

// var me = new Person('Inthra', 35);
// // console.log(`${me.name} is ${me.age} years old.`)

// var desc = me.getUserDesc();
// console.log(desc);
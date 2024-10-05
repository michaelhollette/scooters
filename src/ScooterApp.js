// require the User and Scooter classes - see where they can be used in ScooterApp.js
const User = require('./User.js')
const Scooter = require('./Scooter.js')
class ScooterApp {
  // ScooterApp code here
  constructor(){
    this.stations = {
      station1 : [],
      station2: [],
      station3 : [],
    }
    this.registeredUsers = {}
  }
  registerUser(username,password, age){
    if(age < 18){
      throw new Error('Too young to register')
    }
    for(let user in this.registeredUsers){
      if (username == user){
        throw new Error('Already registered')
      }
    }
    let newUser = new User(username, password, age)
    this.registeredUsers[username]= newUser
    console.log('User has been registered')
    return newUser
  }
  loginUser(username, password){
    for(let user in this.registeredUsers){
      if(user == username && this.registeredUsers[user].password== password){
        this.registeredUsers[user].loggedIn = true;
        console.log(`${username} has been logged in`)
        return
      }else{
        throw new Error('Username or password is incorrect')
      }
    }
  }
  logoutUser(username){
    for(let user in this.registeredUsers){
      if(user == username && this.registeredUsers[user].loggedIn == true){
        this.registeredUsers[user].loggedIn = false;
        console.log(`${username} has been logged out`)
        return
      }
    }
    throw new Error(`${username} is not logged in`)
  }
  createScooter(station){
    let scooter = new Scooter(station)
    for (let s in this.stations){
      if (s == station){
        this.stations[s].push(scooter)
        console.log('Created new scooter')
        return scooter
      }
    }
    throw new Error('No such station')
  }
  dockScooter(scooter, station) {
    if (!this.stations[station]) {
        throw new Error(`${station} does not exist`);
    }

    if (scooter.station === station) {
        throw new Error('Scooter is already at station');
    }

    this.stations[station].push(scooter);  
    scooter.station = station; 
    scooter.user = null; 
    console.log("Scooter is docked");
    return scooter; 
}

  rentScooter(scooter, user) {
    let scooterFound = false;

    for (let station in this.stations) {
        for (let i = 0; i < this.stations[station].length; i++) {
            if (this.stations[station][i] === scooter) {
                scooterFound = true; 
                break; 
            }
        }
        if (scooterFound) {
            break; 
        }
    }

    if (!scooterFound) {
        throw new Error('Scooter not found at any station');
    }

    if (scooter.user) {
        throw new Error('Scooter already rented');
    }
    scooter.station = null;
    scooter.user = user; 
    console.log("Scooter is rented to: ", user.username);
  }
  print() {
    console.log("Registered Users: ", this.registeredUsers);
    console.log("Stations and Scooters:");
    for (let s in this.stations) {
      console.log(`${s} has ${this.stations[s].length} scooters`);
    }
  }
  

}

const app = new ScooterApp()
const user = app.registerUser('alice', 'password123', 20);
const scooter = app.createScooter('station1')
app.print()
app.rentScooter(scooter,user)
app.print()
module.exports = ScooterApp

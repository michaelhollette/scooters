const User = require('./User.js');
const Scooter = require('./Scooter.js')
const ScooterApp = require('./ScooterApp.js');

describe('ScooterApp Tests', () => {
  let app;

  beforeEach(() => {
    app = new ScooterApp(); 
  });

  describe('User Registration', () => {
    test('should register a user successfully', () => {
      const user = app.registerUser('alice', 'password123', 20);
      expect(user.username).toBe('alice');
    });

    test('should not allow duplicate registration', () => {
      app.registerUser('alice', 'password123', 20);
      expect(() => {
        app.registerUser('alice', 'password123', 20);
      }).toThrow('Already registered');
    });

    test('should not allow registration under age 18', () => {
      expect(() => {
        app.registerUser('bob', 'password123', 17);
      }).toThrow('Too young to register');
    });
  });

  describe('User Login', () => {
    test('should login a registered user', () => {
      app.registerUser('alice', 'password123', 20);
      app.loginUser('alice', 'password123');
      expect(app.registeredUsers['alice'].loggedIn).toBe(true);
    });

    test('should not login with wrong password', () => {
      app.registerUser('alice', 'password123', 20);
      expect(() => {
        app.loginUser('alice', 'wrongpassword');
      }).toThrow('Username or password is incorrect');
    });
  });

  describe('User Logout', () => {
    test('should logout a logged-in user', () => {
      app.registerUser('alice', 'password123', 20);
      app.loginUser('alice', 'password123');
      app.logoutUser('alice');
      expect(app.registeredUsers['alice'].loggedIn).toBe(false);
    });

    test('should throw error if user is not logged in', () => {
      app.registerUser('alice', 'password123', 20);
      expect(() => {
        app.logoutUser('alice');
      }).toThrow('alice is not logged in');
    });
  });

  describe('Scooter Management', () => {
    test('should create a scooter successfully', () => {
      const scooter = app.createScooter('station1');
      expect(scooter).toBeInstanceOf(Scooter);
      expect(app.stations['station1']).toContain(scooter);
    });

    test('should not create a scooter at a non-existent station', () => {
      expect(() => {
        app.createScooter('station4');
      }).toThrow('No such station');
    });

    test('should rent a scooter', () => {
      const scooter = app.createScooter('station1');
      app.registerUser('alice', 'password123', 20);
      app.loginUser('alice', 'password123');
      app.rentScooter(scooter, app.registeredUsers['alice']);
      expect(scooter.user).toBe(app.registeredUsers['alice']);
      expect(scooter.station).toBe(null); 
    });

    test('should not rent an already rented scooter', () => {
      const scooter = app.createScooter('station1');
      app.registerUser('alice', 'password123', 20);
      app.loginUser('alice', 'password123');
      app.rentScooter(scooter, app.registeredUsers['alice']);
      expect(() => {
        app.rentScooter(scooter, app.registeredUsers['bob']);
      }).toThrow('Scooter already rented');
    });

    test('should dock a scooter successfully', () => {
      const scooter = app.createScooter('station1');
      app.registerUser('alice', 'password123', 20);
      app.loginUser('alice', 'password123');
      app.rentScooter(scooter, app.registeredUsers['alice']);
      app.dockScooter(scooter, 'station1');
      expect(scooter.station).toBe('station1');
      expect(scooter.user).toBe(null);
    });

    test('should not dock an already docked scooter', () => {
      const scooter = app.createScooter('station1');
      expect(() => {
        app.dockScooter(scooter, 'station1');
      }).toThrow('Scooter is already at station');
    });
  });

  describe('Print Method', () => {
    test('should execute print method without errors', () => {
      app.print(); 
      expect(true).toBe(true); 
    });
  });
});


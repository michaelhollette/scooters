class Scooter {
  // scooter code here
  static nextSerial = 1
  constructor(station){
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial += 1;
    this.charge = 100;
    this.isBroken = false;
    }
  rent(user){
    if (this.charge > 20 && this.isBroken == false){
      this.user = user
      this.station = null;
    }else if(this.charge < 20 && this.isBroken == false){
      throw new Error('Scooter needs to charge')
    }else if(this.charge > 20 && this.isBroken == true){
      throw new Error('Scooter needs repair')
    }else{
      throw new Error('Scooter needs to charge and be repaired')
    }
  }

  dock(station){
    this.user = null;
    this.station = station;
  }
  
  }


module.exports = Scooter

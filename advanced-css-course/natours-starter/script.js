let car = [
  {
    time: 0,
    bank: 1,
    cross: false,
  },
  {
    time: 10,
    bank: 1,
    cross: false,
  },
  {
    time: 20,
    bank: 1,
    cross: false,
  },
  {
    time: 30,
    bank: 1,
    cross: false,
  },
  {
    time: 40,
    bank: 1,
    cross: false,
  },
  {
    time: 50,
    bank: 1,
    cross: false,
  },
  {
    time: 60,
    bank: 1,
    cross: false,
  },
  {
    time: 70,
    bank: 1,
    cross: false,
  },
];

const max = 2;
const time  = 10;

let ship = {
  bank: 1,
  time: 0,
  slot: 0,
}

let i = 0;

while(i < car.length) {
  if (car[i].time <= ship.time && car[i].bank === ship.bank && !cross) {
    slot += 1;
    i++;
  } else {
    ship.bank = ship.bank === 1 ? 2 : 1
    ship.time += time
    ship.slot = 0;
    console.log(ship.time)
  }
}
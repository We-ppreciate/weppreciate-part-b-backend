const bcrypt = require('bcrypt');

let passwords = [
  {
    email: 'nate.picone@yourcompany.com',
    password: 'password',
    passwordHash: null
  },
  {
    email: 'ed.dougherty@yourcompany.com',
    password: 'password234',
    passwordHash: null
  },
  {
    email: 'Hannah.Sallows@yourcompany.com',
    password: 'password456',
    passwordHash: null
  },
  {
    email: 'Katie.Lock@yourcompany.com',
    password: 'password678',
    passwordHash: null
  },
  {
    email: 'Alex.Greatbeard@yourcompany.com',
    password: 'password789',
    passwordHash: null
  },
  {
    email: 'Carolina.Reaper@yourcompany.com',
    password: 'password890',
    passwordHash: null
  }
]

const passwordHashForSeed = async () => {
  for (let i = 0; i < passwords.length; i++) {
    try {
      passwords[i].passwordHash = await bcrypt.hash(passwords[i].password, 10);
      
    } catch (error) {
      logToFile(`seed.js: ${error}`);
      console.log(`seed.js: ${error}`);
    }
  }
  // passwords.push(...passwords);
  console.log(passwords);
}

passwordHashForSeed();
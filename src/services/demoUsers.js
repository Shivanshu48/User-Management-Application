const indianUserProfiles = [
  {
    name: 'Aarav Sharma',
    username: 'aarav.sharma',
    email: 'aarav.sharma@synlabs.demo',
    phone: '+91 98765 43210',
    website: 'aaravsharma.in',
    company: {
      name: 'Synlabs Digital',
      catchPhrase: 'Building dependable digital workflows',
    },
    address: {
      suite: 'A-402',
      street: 'MG Road',
      city: 'Bengaluru',
      zipcode: '560001',
    },
  },
  {
    name: 'Priya Nair',
    username: 'priya.nair',
    email: 'priya.nair@synlabs.demo',
    phone: '+91 99887 77665',
    website: 'priyanair.in',
    company: {
      name: 'Nair Analytics',
      catchPhrase: 'Data-led decisions for growing teams',
    },
    address: {
      suite: '12B',
      street: 'Marine Drive',
      city: 'Mumbai',
      zipcode: '400020',
    },
  },
  {
    name: 'Rohan Mehta',
    username: 'rohan.mehta',
    email: 'rohan.mehta@synlabs.demo',
    phone: '+91 91234 56780',
    website: 'rohanmehta.in',
    company: {
      name: 'Mehta CloudWorks',
      catchPhrase: 'Secure cloud operations made simple',
    },
    address: {
      suite: '7th Floor',
      street: 'SG Highway',
      city: 'Ahmedabad',
      zipcode: '380054',
    },
  },
  {
    name: 'Ananya Iyer',
    username: 'ananya.iyer',
    email: 'ananya.iyer@synlabs.demo',
    phone: '+91 90909 12345',
    website: 'ananyaiyer.in',
    company: {
      name: 'Iyer Product Studio',
      catchPhrase: 'Human-centred products for Indian businesses',
    },
    address: {
      suite: 'C-18',
      street: 'Anna Salai',
      city: 'Chennai',
      zipcode: '600002',
    },
  },
  {
    name: 'Kabir Khan',
    username: 'kabir.khan',
    email: 'kabir.khan@synlabs.demo',
    phone: '+91 98111 22334',
    website: 'kabirkhan.in',
    company: {
      name: 'Khan Mobility Labs',
      catchPhrase: 'Reliable platforms for moving teams',
    },
    address: {
      suite: 'Tower 2',
      street: 'Cyber City',
      city: 'Gurugram',
      zipcode: '122002',
    },
  },
  {
    name: 'Sneha Reddy',
    username: 'sneha.reddy',
    email: 'sneha.reddy@synlabs.demo',
    phone: '+91 97000 44556',
    website: 'snehareddy.in',
    company: {
      name: 'Reddy Retail Systems',
      catchPhrase: 'Smarter customer operations at scale',
    },
    address: {
      suite: 'Plot 42',
      street: 'HITEC City',
      city: 'Hyderabad',
      zipcode: '500081',
    },
  },
  {
    name: 'Vivaan Gupta',
    username: 'vivaan.gupta',
    email: 'vivaan.gupta@synlabs.demo',
    phone: '+91 98989 10101',
    website: 'vivaangupta.in',
    company: {
      name: 'Gupta Fintech Services',
      catchPhrase: 'Practical finance tools for modern teams',
    },
    address: {
      suite: 'B-21',
      street: 'Connaught Place',
      city: 'New Delhi',
      zipcode: '110001',
    },
  },
  {
    name: 'Meera Joshi',
    username: 'meera.joshi',
    email: 'meera.joshi@synlabs.demo',
    phone: '+91 94220 33445',
    website: 'meerajoshi.in',
    company: {
      name: 'Joshi Design Co.',
      catchPhrase: 'Design systems that scale with care',
    },
    address: {
      suite: 'Office 305',
      street: 'FC Road',
      city: 'Pune',
      zipcode: '411004',
    },
  },
  {
    name: 'Aditya Bose',
    username: 'aditya.bose',
    email: 'aditya.bose@synlabs.demo',
    phone: '+91 93300 55667',
    website: 'adityabose.in',
    company: {
      name: 'Bose Logistics Tech',
      catchPhrase: 'Transparent operations for supply chains',
    },
    address: {
      suite: 'Block E',
      street: 'Salt Lake Sector V',
      city: 'Kolkata',
      zipcode: '700091',
    },
  },
  {
    name: 'Ishita Kapoor',
    username: 'ishita.kapoor',
    email: 'ishita.kapoor@synlabs.demo',
    phone: '+91 98710 90909',
    website: 'ishitakapoor.in',
    company: {
      name: 'Kapoor PeopleOps',
      catchPhrase: 'Employee-first systems for fast teams',
    },
    address: {
      suite: 'D-11',
      street: 'Bandra Kurla Complex',
      city: 'Mumbai',
      zipcode: '400051',
    },
  },
];

export function localizeUser(user) {
  const demoProfile = indianUserProfiles[(Number(user.id) - 1) % indianUserProfiles.length];

  if (!demoProfile) {
    return user;
  }

  return {
    ...user,
    ...demoProfile,
    id: user.id,
  };
}

export function localizeUsers(users) {
  return users.map((user) => localizeUser(user));
}

type OnlineUser = {
  username: string;
  status: "online" | "offline";
  lastActivity: number;
};

type OnlineUsersOverview = {
  online?: string[];
  offline?: string[];
  away?: string[];
};

const showOnlineStatus = (users: OnlineUser[]): OnlineUsersOverview => {
  if (users.length === 0) {
    return {};
  }

  const defaultOnlineUsersOverview: OnlineUsersOverview = {
    online: [],
    offline: [],
    away: [],
  };

  const recentActivityThreshold = 10;

  return users.reduce((acc, curr) => {
    if (curr.status === "online") {
      if (curr.lastActivity > recentActivityThreshold) {
        acc.away?.push(curr.username);
      } else {
        acc.online?.push(curr.username);
      }
      return acc;
    }
    acc.offline?.push(curr.username);
    return acc;
  }, defaultOnlineUsersOverview);
};

// TESTING AREA

const testInputOne: OnlineUser[] = [
  {
    username: "David",
    status: "online",
    lastActivity: 10,
  },
  {
    username: "Lucy",
    status: "offline",
    lastActivity: 22,
  },
  {
    username: "Bob",
    status: "online",
    lastActivity: 104,
  },
];

// {
//   "online": [
//     "David"
//   ],
//   "offline": [
//     "Lucy"
//   ],
//   "away": [
//     "Bob"
//   ]
// }

const testInputTwo: OnlineUser[] = []; // {}

console.log(showOnlineStatus(testInputOne));
console.log(showOnlineStatus(testInputTwo));

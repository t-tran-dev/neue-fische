type TicketTier = "standing" | "seated" | "vip";

type Seat = [rowLetter: string, seatNumber: number];

interface Ticket {
  readonly id: number;
  tier: TicketTier;
  seat?: Seat;
}

type VipTicket = Ticket & { loungeAccess: boolean };

const standingTicket: Ticket = {
  id: 1,
  tier: "standing",
};

const seatedTicket: Ticket = {
  id: 2,
  tier: "seated",
  seat: ["B", 12],
};

const vipTicket: VipTicket = {
  id: 3,
  tier: "vip",
  seat: ["A", 1],
  loungeAccess: true,
};

const ticketPrice = (tier: TicketTier): number => {
  switch (tier) {
    case "vip":
      return 90;
    case "seated":
      return 60;
    default:
      return 30;
  }
};

const describeSeat = (seat: Seat): string => {
  const [rowLetter, seatNumber] = seat;
  return `Row ${rowLetter}, seat ${seatNumber}`;
};

const parseQuantity = (input: unknown): number => {
  if (typeof input !== "number") return 0;
  return input;
};

const showTicketDescription = (ticket: Ticket | VipTicket): void => {
  const { tier, seat } = ticket;
  const price = ticketPrice(tier);
  const baseDescription = `Tier: ${tier} | Price: ${price}`;
  if (!seat) return console.log(baseDescription);
  const seatDescrition = describeSeat(seat);
  return console.log(`${baseDescription} | ${seatDescrition}`);
};

showTicketDescription(standingTicket);
showTicketDescription(seatedTicket);
showTicketDescription(vipTicket);

console.log(parseQuantity(5));
console.log(parseQuantity("seatedTicket"));
console.log(parseQuantity(JSON.parse("3")));

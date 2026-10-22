interface Media {
  id: number;
  title: string;
}

interface Track extends Media {
  artist: string;
  liked: boolean;
}

interface FeaturedTrack extends Track {
  curatedBy: string;
  readonly addedDate: string;
}

const pick: FeaturedTrack = {
  id: 3,
  title: "Golden",
  artist: "Jill Scott",
  liked: true,
  curatedBy: "editorial",
  addedDate: "2024-01-15",
};

console.log(`${pick.title} — featured since ${pick.addedDate}`);

type HasRating = {
  rating: 1 | 2 | 3 | 4 | 5;
};

type RatedTrack = Track & HasRating;

const review: RatedTrack = {
  id: 4,
  title: "Ivy",
  artist: "Frank Ocean",
  liked: true,
  rating: 5,
};

console.log(`${review.title}: ${review.rating}/5`);

type ChartEntry = [number, string];

const chart: ChartEntry[] = [
  [1, "Nights"],
  [2, "Blue Light"],
];

for (const [position, title] of chart) {
  console.log(`#${position} ${title}`);
}

function describeTrack(track: Track): string {
  return `${track.title} by ${track.artist}`;
}

const tracks: Track[] = [
  { id: 1, title: "Blue Light", artist: "Jorja Smith", liked: true },
  { id: 2, title: "Nights", artist: "Frank Ocean", liked: false },
];

console.log(describeTrack(tracks[0]));

type Format = "vinyl" | "cd" | "digital";
type TrackLength = number | string;

function describeFormat(format: Format): string {
  return `Available on ${format}`;
}

function formatLength(length: TrackLength): string {
  if (typeof length === "number") {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }
  return length;
}

console.log(describeFormat("vinyl"));
console.log(formatLength(245));
console.log(formatLength("3:12"));

const label = "My Library";
const trackCount = tracks.length;

function formatId(id: number): string {
  return `TRK-${id}`;
}

const ids = tracks.map((t) => formatId(t.id));
console.log(ids, label, trackCount);

export interface Formation  {
  id: number;
  photoName: string;
  name: string;
  type: string;
  nameCoach: string;
  price: number;
  date: number;
  _links: {
    self: {
      href: string
    },
    formation: {
      href: string
    },
  };
}

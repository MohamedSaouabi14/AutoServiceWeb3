export interface Formation  {
  id: string;
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

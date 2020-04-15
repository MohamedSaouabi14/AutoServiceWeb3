export interface Formation  {
  id: number;
  photoName: string;
  nameFormation: string;
  type: string;
  nameCoach: string;
  _links: {
    self: {
      href: string
    },
    formation: {
      href: string
    },
  };
}

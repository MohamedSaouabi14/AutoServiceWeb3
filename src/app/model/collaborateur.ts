export interface Collaborateur  {
  id: number;
  name: string;
  adresse: string;
  phoneNumber: number;
  available: boolean;
  promotion: boolean;
  photoName: string;
  description: string;
  _links: {
    self: {
      href: string
    },
    collaborateur: {
      href: string
    },
    prestation: {
      href: string
    }
  };
}

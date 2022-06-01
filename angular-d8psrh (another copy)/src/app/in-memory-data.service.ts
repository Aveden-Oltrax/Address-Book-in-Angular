import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      {
        id: 185,
        name: 'Akshay Patil',
        mobile: '9638525575',
        email: 'akshay.25@ainosoft.com',
      },
      {
        id: 186,
        name: 'Manas Shinde',
        mobile: '8531542748',
        email: 'manas.5@ainosoft.com',
      },
      {
        id: 187,
        name: 'Tejas Rao',
        mobile: '7841535145',
        email: 'tejas.94@ainosoft.com',
      },
      {
        id: 188,
        name: 'Tejal Khemnar',
        mobile: '96452101405',
        email: 'tejal.47@ainosoft.com',
      },
      {
        id: 189,
        name: 'Monica',
        mobile: '7513505548',
        email: 'monica.6@ainosoft.com',
      },
      {
        id: 190,
        name: 'Ritika',
        mobile: '9015475513',
        email: 'ritika.55@ainosoft.com',
      },
      {
        id: 191,
        name: 'Sneha',
        mobile: '9754153621',
        email: 'sneha.04@ainosoft.com',
      },
    ];
    return { contacts };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(contacts: Contact[]): number {
    return contacts.length > 0
      ? Math.max(...contacts.map((contact) => contact.id)) + 1
      : 185;
  }
}

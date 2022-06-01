import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];


  constructor(
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }


  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }

  delete(contact: Contact): void {
    this.contacts = this.contacts.filter(h => h !== contact);
    this.contactService.deleteContact(contact.id).subscribe();
  }

}

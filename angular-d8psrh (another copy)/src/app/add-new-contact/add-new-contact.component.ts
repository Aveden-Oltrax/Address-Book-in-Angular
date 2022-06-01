import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.css'],
})
export class AddNewContactComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {}

  add(name: string, mobile: string, email: string): void {
    name = name.trim();
    mobile = mobile.trim();
    email = email.trim();
    if (!name || !mobile || !email) {
      return;
    }
    this.contactService
      .addContact({ name, mobile, email } as Contact)
      .subscribe((contact) => {
        this.contacts.push(contact);
      });
  }
}

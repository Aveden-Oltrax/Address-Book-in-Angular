import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  // @Input() contact?: Contact;
  // hero: Hero | undefined;
  contact: Contact | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContact(id).subscribe(contact => this.contact = contact);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.contact) {
      this.contactService.updateContact(this.contact)
        .subscribe(() => this.goBack());
    }
  }

}

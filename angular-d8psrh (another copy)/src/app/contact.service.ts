import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { CONTACTS } from './mock-contacts';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  /** Log a ContactService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ContactService: ${message}`);
  }

  private contactsUrl = 'api/contacts'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // getContacts(): Observable<Contact[]> {
  //   const contacts = of(CONTACTS);
  //   this.messageService.add(' ContactService: fetched contacts ');
  //   console.log(' ContactService: fetched contacts ');
  //   return contacts;
  // }

  /** GET contacts from the server */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      tap((_) => this.log('fetched contacts')),
      catchError(this.handleError<Contact[]>('contactsUrl', []))
    );
  }

  // getContact(id: number): Observable<Contact> {
  //   const contact = CONTACTS.find((c) => c.id === id)!;
  //   this.messageService.add('ContactService: fetched contact id = ' + id);
  //   console.log('ContactService: fetched contact id = ' + id);
  //   return of(contact);
  // }

  /** GET contact by id. Will 404 if id not found */
  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Contact>(`getHero id=${id}`))
    );
  }

  /** PUT: update the contact on the server */

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      tap((_) => this.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }

  /** DELETE: delete the contact from the server */
  deleteContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete<Contact>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  /** POST: add a new contact to the server */
  addContact(contact: Contact): Observable<Contact> {
    return this.http
      .post<Contact>(this.contactsUrl, contact, this.httpOptions)
      .pipe(
        tap((newContact: Contact) =>
          this.log(`added contact w/ id=${newContact.id}`)
        ),
        catchError(this.handleError<Contact>('addContact'))
      );
  }

  /* GET contact whose name contains search term */
  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Contact[]>(`${this.contactsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Contact[]>('searchContacts', []))
    );
  }
}

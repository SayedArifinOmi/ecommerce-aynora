import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'https://aynora-api.azurewebsites.net/api/contact';

  constructor(private http: HttpClient) {}

  sendMessage(payload: { name: string; email: string; subject: string; message: string }) {
    return this.http.post(this.baseUrl, payload);
  }

  // Admin APIs
  getMessages() {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteMessage(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  markRead(id: number) {
    return this.http.patch(`${this.baseUrl}/${id}/read`, {});
  }
}

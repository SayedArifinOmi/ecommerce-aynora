import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  teamMembers = [
    { name: 'Sayed Arifin', role: 'Founder & CEO', photo: 'assets/avatar.png' },
    { name: 'Laila Sultana', role: 'Product Manager', photo: 'assets/avatar.png' },
      { name: 'Shimul Ahmed', role: 'Product Manager', photo: 'assets/avatar.png' },
  ];
}

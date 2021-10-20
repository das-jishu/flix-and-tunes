import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  contactme(site: string) {
    let link = "";
    switch(site) {
      case 'twitter':
        link = "https://twitter.com/lord_danton";
        break;
      case 'github':
        link = "https://github.com/das-jishu";
        break;
      case 'facebook':
        link = "https://www.facebook.com/subham.das.39948";
        break;
      case 'linkedin':
        link = "https://www.linkedin.com/in/subham-das-profile";
        break;
      default:
        link = "mailto:das.jishu25@gmail.com";
        break;
    }
    window.open(link, '_blank');
  }

  getCurrentDate() {
    let currentYear = new Date().getFullYear();
    return currentYear;
  }

  goToHome() {
    this.router.navigate(['/search']);
  }

}

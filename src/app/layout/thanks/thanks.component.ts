import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {

  public order: any;

  constructor() { }

  ngOnInit() {

    // Get Order (localStorage)
    if (
      localStorage.getItem('order') !== "" &&
      localStorage.getItem('order') !== null) {

      this.order = JSON.parse(localStorage.getItem('order'));
    }

  }

}

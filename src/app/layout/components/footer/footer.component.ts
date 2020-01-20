// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  sticky: boolean = false;
  elementPosition: any;
  

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])

    handleScroll(){

      const windowScroll = window.pageYOffset;
      const bottom = document.body.scrollHeight - 654;

      // if(windowScroll >= 76){
      //   this.sticky = true;
      // }

      // if(windowScroll >= bottom - 90) {
      //   this.sticky = false;
      // }

      // if (windowScroll <= 75) {
      //   this.sticky = false;
      // }

  
    }

}

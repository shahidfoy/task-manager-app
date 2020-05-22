import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCollapsed: boolean;

  ngOnInit() {
    this.isCollapsed = false;
    /* fix ng zorro subnav collapse bug */
    setTimeout(() => {
      this.isCollapsed = !this.isCollapsed;
    }, 500);
  }
}

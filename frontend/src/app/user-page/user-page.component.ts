import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user: string = "";

  constructor(
    private route: ActivatedRoute
  ) { 
    route.params.subscribe(params => this.user = params["user"]);
  }

  ngOnInit(): void {
  }

}

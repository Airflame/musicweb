import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {

  @Input()
  public albumTitle: string = "";

  @Input()
  public artistName: string = "";

  @Input()
  public coverUrl: string = "";

  @Input()
  public genres: string = "";

  @Input()
  public year: number = 0;

  @Input()
  public rating: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}

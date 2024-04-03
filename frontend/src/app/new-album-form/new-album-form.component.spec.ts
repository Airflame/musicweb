import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlbumFormComponent } from './new-album-form.component';

describe('NewAlbumFormComponent', () => {
  let component: NewAlbumFormComponent;
  let fixture: ComponentFixture<NewAlbumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAlbumFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAlbumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

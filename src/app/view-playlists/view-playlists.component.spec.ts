import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlaylistsComponent } from './view-playlists.component';

describe('ViewPlaylistsComponent', () => {
  let component: ViewPlaylistsComponent;
  let fixture: ComponentFixture<ViewPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

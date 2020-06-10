import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArmodePage } from './armode.page';

describe('ArmodePage', () => {
  let component: ArmodePage;
  let fixture: ComponentFixture<ArmodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArmodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

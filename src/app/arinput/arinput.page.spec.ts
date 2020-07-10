import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArinputPage } from './arinput.page';

describe('ArinputPage', () => {
  let component: ArinputPage;
  let fixture: ComponentFixture<ArinputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArinputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArinputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

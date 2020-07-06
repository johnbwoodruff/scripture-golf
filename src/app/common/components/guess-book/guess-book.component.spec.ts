import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuessBookComponent } from './guess-book.component';

describe('GuessComponent', () => {
  let component: GuessBookComponent;
  let fixture: ComponentFixture<GuessBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuessBookComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuessBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

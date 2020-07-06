import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuessChapterComponent } from './guess-chapter.component';

describe('GuessChapterComponent', () => {
  let component: GuessChapterComponent;
  let fixture: ComponentFixture<GuessChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessChapterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuessChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

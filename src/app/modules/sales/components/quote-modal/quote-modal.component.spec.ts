import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteModalComponent } from './quote-modal.component';

describe('QuoteModalComponent', () => {
  let component: QuoteModalComponent;
  let fixture: ComponentFixture<QuoteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteModalComponent]
    });
    fixture = TestBed.createComponent(QuoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

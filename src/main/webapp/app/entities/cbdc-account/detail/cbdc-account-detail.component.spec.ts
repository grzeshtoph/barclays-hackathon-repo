import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CBDCAccountDetailComponent } from './cbdc-account-detail.component';

describe('CBDCAccount Management Detail Component', () => {
  let comp: CBDCAccountDetailComponent;
  let fixture: ComponentFixture<CBDCAccountDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CBDCAccountDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cBDCAccount: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CBDCAccountDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CBDCAccountDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cBDCAccount on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cBDCAccount).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

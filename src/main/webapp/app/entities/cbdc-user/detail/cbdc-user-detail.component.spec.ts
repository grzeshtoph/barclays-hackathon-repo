import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CBDCUserDetailComponent } from './cbdc-user-detail.component';

describe('CBDCUser Management Detail Component', () => {
  let comp: CBDCUserDetailComponent;
  let fixture: ComponentFixture<CBDCUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CBDCUserDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cBDCUser: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CBDCUserDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CBDCUserDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cBDCUser on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cBDCUser).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

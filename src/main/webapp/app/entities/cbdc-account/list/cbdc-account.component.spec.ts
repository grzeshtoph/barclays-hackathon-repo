import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CBDCAccountService } from '../service/cbdc-account.service';

import { CBDCAccountComponent } from './cbdc-account.component';

describe('CBDCAccount Management Component', () => {
  let comp: CBDCAccountComponent;
  let fixture: ComponentFixture<CBDCAccountComponent>;
  let service: CBDCAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'cbdc-account', component: CBDCAccountComponent }]), HttpClientTestingModule],
      declarations: [CBDCAccountComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(CBDCAccountComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CBDCAccountComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CBDCAccountService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.cBDCAccounts?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to cBDCAccountService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCBDCAccountIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCBDCAccountIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});

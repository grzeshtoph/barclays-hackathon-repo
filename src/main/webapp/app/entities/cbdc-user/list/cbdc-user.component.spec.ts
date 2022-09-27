import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CBDCUserService } from '../service/cbdc-user.service';

import { CBDCUserComponent } from './cbdc-user.component';

describe('CBDCUser Management Component', () => {
  let comp: CBDCUserComponent;
  let fixture: ComponentFixture<CBDCUserComponent>;
  let service: CBDCUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'cbdc-user', component: CBDCUserComponent }]), HttpClientTestingModule],
      declarations: [CBDCUserComponent],
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
      .overrideTemplate(CBDCUserComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CBDCUserComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CBDCUserService);

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
    expect(comp.cBDCUsers?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to cBDCUserService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCBDCUserIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCBDCUserIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});

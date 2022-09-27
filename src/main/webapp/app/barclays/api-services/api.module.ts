import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { CBDCLedgerService } from './api/cBDCLedger.service';
import { CommercialBanksService } from './api/commercialBanks.service';
import { CurrencyService } from './api/currency.service';
import { EcosystemServiceDomesticPaymentProcessorService } from './api/ecosystemServiceDomesticPaymentProcessor.service';
import { OBAISPService } from './api/oBAISP.service';
import { OBPISPService } from './api/oBPISP.service';
import { PaymentInterfaceProvidersPIPsService } from './api/paymentInterfaceProvidersPIPs.service';
import { SandboxEnvironmentService } from './api/sandboxEnvironment.service';
import { StartHereService } from './api/startHere.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    CBDCLedgerService,
    CommercialBanksService,
    CurrencyService,
    EcosystemServiceDomesticPaymentProcessorService,
    OBAISPService,
    OBPISPService,
    PaymentInterfaceProvidersPIPsService,
    SandboxEnvironmentService,
    StartHereService,
  ],
})
export class ApiModule {
  public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: ApiModule, @Optional() http: HttpClient) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' + 'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}

import { CountryService } from './../../services/country.service';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  private countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]); //Funcion que devuelve un observable con un arreglo vacio
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query,
        },
      });
      return this.countryService.searchCapital(request.query);
    },
  });

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];
  //     return await firstValueFrom(
  //       //Convierte un observable en una promesa
  //       this.countryService.searchCapital(request.query)
  //     );
  //   },
  // });
  // capital = signal<Country[]>([]);

  // isLoanding = signal(false);
  // isError = signal<string | null>(null);

  // search(query: string) {
  //   if (this.isLoanding()) return;
  //   this.isLoanding.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchCapital(query).subscribe({
  //     next: (conuntries) => {
  //       this.isLoanding.set(false);
  //       this.capital.set(conuntries);
  //     },
  //     error: (err) => {
  //       this.isLoanding.set(false);
  //       this.capital.set([]);
  //       this.isError.set(err);
  //     },
  //   });
  // }
}

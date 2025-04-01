import type { Country } from '../interfaces/country.interfaces';
import type { CountryResponse } from '../interfaces/ctr.interfaces';

export class CountryMapper {
  static mapCtrToCountry(item: CountryResponse): Country {
    return {
      capital: item.capital?.join(', '),
      name: item.translations['spa'].common,
      population: item.population,
      flag: item.flag,
      flags: item.flags,
      cca2: item.cca2,
    };
  }
  static mapCtrtemsToCountryArray(items: CountryResponse[]): Country[] {
    return items.map(this.mapCtrToCountry); //hace lo mismo que la de abajo
    //return items.map((country) => this.mapCtrToCountry(country));
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import type { CountryResponse } from '../interfaces/ctr.interfaces';
import type { Country } from '../interfaces/country.interfaces';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<CountryResponse[]>(`${API_URL}/capital/${query}`).pipe(
      map((items) => CountryMapper.mapCtrtemsToCountryArray(items)),
      delay(1000),
      catchError((err) => {
        console.log(`Error fetching`, err);
        return throwError(
          () =>
            new Error(`No se encontro ninguna capital con el nombre: ${query}`)
        );
      })
    );
  }

  searchCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<CountryResponse[]>(`${API_URL}/name/${query}`).pipe(
      map((countries) => CountryMapper.mapCtrtemsToCountryArray(countries)),
      delay(1000),
      catchError((err) => {
        console.log(`Error fetching`, err);
        return throwError(
          () => new Error(`No se encontro ninguna Pais con el nombre: ${query}`)
        );
      })
    );
  }

  searchCountryByAlpchaCode(code: string) {
    return this.http.get<CountryResponse[]>(`${API_URL}/alpha/${code}`).pipe(
      map((countries) => CountryMapper.mapCtrtemsToCountryArray(countries)),
      map((countries) => countries.at(0)),
      catchError((err) => {
        console.log(`Error fetching`, err);
        return throwError(
          () => new Error(`No se encontro ninguna Pais con el codigo: ${code}`)
        );
      })
    );
  }
}

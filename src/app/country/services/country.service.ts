import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import type { CountryResponse } from '../interfaces/ctr.interfaces';
import type { Country } from '../interfaces/country.interfaces';
import type { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }
    console.log('Llegndo al servidor');

    return this.http.get<CountryResponse[]>(`${API_URL}/capital/${query}`).pipe(
      map((items) => CountryMapper.mapCtrtemsToCountryArray(items)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
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

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }
    console.log('Llegndo al servidor');
    console.log(this.queryCacheCountry);

    return this.http.get<CountryResponse[]>(`${API_URL}/name/${query}`).pipe(
      map((countries) => CountryMapper.mapCtrtemsToCountryArray(countries)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      catchError((err) => {
        console.log(`Error fetching`, err);
        return throwError(
          () => new Error(`No se encontro ninguna Pais con el nombre: ${query}`)
        );
      })
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    if (this.queryCacheCapital.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<CountryResponse[]>(`${API_URL}/region/${region}`).pipe(
      map((countries) => CountryMapper.mapCtrtemsToCountryArray(countries)),
      tap((country) => this.queryCacheRegion.set(region, country)),
      catchError((err) => {
        console.log(`Error fetching`, err);
        return throwError(() => new Error(`Hubo un error al buscar Paises`));
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

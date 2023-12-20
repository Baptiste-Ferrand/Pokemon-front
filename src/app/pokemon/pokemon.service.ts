import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Pokemon} from "./pokemon";
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor (private http: HttpClient){}

  getPOkemonList(): Observable <Pokemon[]>{
    return this.http.get<Pokemon[]>('http://localhost:3005/pokemon/getall').pipe(
      tap(response => this.log(response)),
      catchError((error)=> this.handleError(error, []))
      );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`http://localhost:3005/pokemon/get/${pokemonId}` ).pipe(
      tap((response)=> console.log(response)),
      catchError((error)=> this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon| undefined>{
    return this.http.put<Pokemon>(`http://localhost:3005/pokemon/update/${pokemon.id}`, pokemon).pipe(
      tap((response)=> console.log(response)),
      catchError((error)=> this.handleError(error, undefined))
    );
  }

  deletePokemon(pokemon: Pokemon): Observable<Pokemon| undefined>{
    return this.http.delete<Pokemon>(`http://localhost:3005/pokemon/delete/${pokemon.id}`).pipe(
      tap((response)=> console.log(response)),
      catchError((error)=> this.handleError(error, undefined))
    );
  }

  createPokemon(pokemon: Pokemon): Observable<Pokemon>{
    return this.http.post<Pokemon>(`http://localhost:3005/pokemon/create`, pokemon).pipe(
      tap((response)=> console.log(response)),
      catchError((error)=> this.handleError(error, undefined))
    );
  }

  private log(response: Pokemon[]|Pokemon|undefined){
    console.log(response);
  }

  private handleError(error: Error, errorValue:  any){
    console.error(error)
    return of(errorValue)
  }

  getPokemonTypeList(): string[]{
    return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psu'];
  }
}

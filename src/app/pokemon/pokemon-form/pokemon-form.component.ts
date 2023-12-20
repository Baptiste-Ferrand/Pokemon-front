import { Component,Input, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../pokemon";
import {Router} from "@angular/router";


@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: Boolean;
  constructor(
      private pokemonService: PokemonService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
  }


  hasType(type: string):boolean{
    return this.pokemon.types.includes(type);
  }
  selectType($event: any, type: string){
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if(isChecked){
      this.pokemon.types.push(type);
    }else{
      this.pokemon.types.splice(this.pokemon.types.indexOf(type), 1);
    }
  }

  isTypesValid(type: string): boolean{
    if(this.pokemon.types.length === 1 && this.hasType(type)){
      return false;
    }
    if(this.pokemon.types.length > 2 && !this.hasType(type)){
      return false;
    }

    return true;
  }
  onSubmit(){
    if(this.isAddForm){
      this.createPokemon();
    }else{
      this.updatePokemon();
    }
  }

  updatePokemon(){
    this.pokemonService.updatePokemon(this.pokemon)
    .subscribe(()=> this.goBack(this.pokemon));
  }

  createPokemon(){
    this.pokemonService.createPokemon(this.pokemon)
    .subscribe((pokemon:Pokemon)=> this.goBack(pokemon));
  }

  goBack(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
  }


}

import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy } from '@angular/core';
import { Hero } from 'app/hero';
import { HeroService } from 'app/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnChanges() {
    if (this.selectedHero) { console.log(`ngOnChanges: ${this.selectedHero.name}`); }
  }

  ngOnInit() {
    if (this.selectedHero) { console.log(`ngOnInit: ${this.selectedHero.name}`); }
    this.getHeroes();
  }

  ngDoCheck() {
    if (this.selectedHero) { console.log(`ngDoCheck: ${this.selectedHero.name}`); }
  }

  ngAfterContentInit() {
    if (this.selectedHero) { console.log(`ngAfterContentInit: ${this.selectedHero.name}`); }
  }

  ngAfterContentChecked() {
    if (this.selectedHero) { console.log(`ngAfterContentChecked: ${this.selectedHero.name}`); }
  }

  ngAfterViewInit() {
    if (this.selectedHero) { console.log(`ngAfterViewInit: ${this.selectedHero.name}`); }
  }

  ngAfterViewChecked() {
    if (this.selectedHero) { console.log(`ngAfterViewChecked: ${this.selectedHero.name}`); }
  }

  ngOnDestroy() {
    if (this.selectedHero) { console.log(`ngOnDestroy: ${this.selectedHero.name}`); }
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        console.log('Heroes Component -> getHeroes -> heroService.getHeroes().subscribe');
        return this.heroes = heroes;
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}

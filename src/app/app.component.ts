import { Component } from '@angular/core';
import { Subscription, timer, of, interval, empty, from, asyncScheduler, range } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, first, last, startWith, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public timerOperator: Subscription;
  public user: Array<any>[];
  public timerUnsubscribe: boolean = true;
  public intervalUnsubscribe: boolean = true;
  public emptyUnsubscribe: boolean = true;
  public intervalSub;
  public emptySub;
  constructor() { }

  // ===================Timer Subscribe and UnSubscribe rxjs operator===================
  timerOperatorMethod() {
    this.timerUnsubscribe = false;
    this.timerOperator = timer(0, 1000).subscribe(val => console.log(val));
  }
  timerOperatorMethodUnsubscribe() {
    this.timerUnsubscribe = true;
    this.timerOperator.unsubscribe();
  }

  // ===================Of rxjs operator===================
  ofOperatorMethod() {
    //emits values of any type
    const source = of({ name: 'Brian' }, [1, 2, 3], () => {
      return 'Hello';
    });
    //output: {name: 'Brian'}, [1,2,3], f () { return 'Hello' }

    const subscribe = source.subscribe(val => console.log(val));
  }

  // ===================Ajax rxjs operator===================
  ajaxOperatorMethod() {
    const githubUsers = `https://api.github.com/users?per_page=2`;
    const users = ajax(githubUsers);
    const subscribe = users.subscribe(
      res => {
        this.user = res.response;
        console.log('user', this.user);
      },
      err => console.error('err', err)
    );
  }

  // ===================Map rxjs operator===================
  mapOBJ() {
    // const mapOBJ = map(x => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
  }

  // ===================First & Last rxjs operator===================
  firstLast() {
    first()(of(1, 2, 3)).subscribe((v) => console.log(`First: ${v}`));
    last()(of(1, 2, 3)).subscribe((v) => console.log(`Last: ${v}`));
  }

  // ===================interval Subscribe and UnSubscribe  rxjs operator===================
  intervalSubscribe() {
    const observable = interval(1000);
    this.intervalSub = observable.subscribe(val => console.log('val', val));
    this.intervalUnsubscribe = false;
  }
  intervalUnSubscribe() {
    this.intervalUnsubscribe = true;
    this.intervalSub.unsubscribe();
  }

  // ===================empty rxjs operator===================
  emptySubscribe() {
    this.emptyUnsubscribe = false;
    const interval$ = interval(1000);
    const result = interval$.pipe(
      mergeMap(x => x % 2 === 1 ? of('a', 'b', 'c') : empty()),
    );
    this.emptySub = result.subscribe(x => console.log('empty if (interval /2 = 1) empty', x));

    // const result = empty().pipe(startWith(7));
    // result.subscribe(x => console.log('empty', x));
  }
  emptyUnSubscribe() {
    this.emptyUnsubscribe = true;
    this.emptySub.unsubscribe();
  }

  // ===================of rxjs operator===================
  of() {
    of('a').subscribe(value => console.log(value));
  }

  // ===================from rxjs operator===================
  from() {
    console.log('start');
    const array = [10, 20, 30];
    const result = from(array, asyncScheduler);
    result.subscribe(x => console.log(x));
    console.log('end');
  }

  // ===================range rxjs operator===================
  range() {
    const numbers = range(1, 10);
    numbers.subscribe(x => console.log(x));
  }

  // ===================range rxjs operator===================

}
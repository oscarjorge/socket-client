import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
  setItem(key, value){
    localStorage.setItem(key, JSON.stringify(value))
  }
  getItem<T>(key: string): T{
    return JSON.parse(localStorage.getItem(key));
  }
  removeItem(key){
    localStorage.removeItem(key)
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export class DataService {
  getListData(): Observable<any> {
    return new Observable(sub => {
      const res = {
        FullName: 'Việt',
        listServices: [
          {
            name: 'Dịch vụ 1 ',
            quantity: 10,
            price: 20000
          },
        ]
      };
      sub.next(res);
    });
  }
}

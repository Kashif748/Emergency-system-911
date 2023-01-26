import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
export interface RootModel {}

@State<RootModel>({ name: 'root' })
@Injectable()
export class RootState {
  constructor() {}
}

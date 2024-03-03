import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading: boolean = false;

  /** Service resposible for loading spinner
   * desc
   * @date 2024-03-03
   */
  constructor() {}

  /**
   * Set loading status in bol
   * @date 2024-03-03
   * @param { boolean } loading
   */
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  /**
   * get loading status in bol
   * @date 2024-03-03
   * @returns { boolean }
   */
  getLoading(): boolean {
    return this.loading;
  }
}

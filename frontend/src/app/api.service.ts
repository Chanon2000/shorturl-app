import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private Url: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  makeShortUrl(originalUrl:string): Observable<any> {
    return this.http.post<any>(`${this.Url}`, { originalUrl }).pipe(
      tap((res:any) => {
        if(res.status == "success") {
          // this.modalService.Notification('error','Error',res.error_message)
        }
      }), 
      map((res:any) => res.data)
    )
  }

  getAllUrls(): Observable<any> {
    return this.http.get<any>(`${this.Url}`).pipe(
      tap((res:any) => {
        if(res.status == "success") {
          // this.modalService.Notification('error','Error',res.error_message)
        }
      }), 
      map((res:any) => res.data)
    )
  }
}

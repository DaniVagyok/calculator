import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  apiUrl = environment.apiUrl;
  

  constructor(private readonly http: HttpClient) { 
  }

  writeValue(val){
    return this.http.post<any>(`${this.apiUrl}/api/write`, val, {responseType: 'text' as 'json'});
  }

  readValue(){
    return this.http.get(`${this.apiUrl}/api/read`);
  }
}

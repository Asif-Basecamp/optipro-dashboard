import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(private httpClient : HttpClient) {
   }

   httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':'application/json'
      })
  };

  GetItemExplosionData(optiProDashboardAPIURL:string,CompanyDBID:string,Warehouse:string,ItemFrom:string,ItemTo:string,SelectionCriteria:string):Observable<any>{
    let jObject:any={ GetData: JSON.stringify([{ 
      CompanyDBID: CompanyDBID,
      Warehouse: Warehouse,
      ItemFrom: ItemFrom,
      ItemTo: ItemTo,
      SelectionCriteria: SelectionCriteria  
  }]) };
  return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetFinishedGoodsList",jObject,this.httpOptions);
 } 

}

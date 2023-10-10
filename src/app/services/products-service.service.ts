import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  
  baseUrl: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  insertProduct(dataProduct: any): Observable<any> {
    return this.http.post(this.baseUrl, dataProduct);
  }

  updateProduct(dataProduct: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${dataProduct.id}`, dataProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}

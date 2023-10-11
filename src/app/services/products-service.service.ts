import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  
  baseUrl: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  insertProduct(dataProduct: any): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, dataProduct);
  }

  updateProduct(dataProduct: any): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${dataProduct.id}`, dataProduct);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ModalProductsComponent } from '../modal-products/modal-products.component';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  productsList: Array<Product>;
  displayedColumns: string[] = ['id', 'product', 'description', 'value', 'action'];
  dataSource: any

  constructor(
    private productsService: ProductsServiceService, 
    public snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListProducts(): void {
    this.productsService.getAllProducts().pipe(take(1)).subscribe({
      next: (response) => {
        this.productsList = response;
        this.dataSource = new MatTableDataSource<any>(this.productsList);

      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id).pipe(take(1)).subscribe({
      next: (response: any) => {

        this.snackBar.open('O produto foi deletado com sucesso!', 'OK', {
          panelClass: ['itau-snackbar'],
          verticalPosition: 'bottom',
          duration: 7000
        });

        this.getListProducts();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }

  openModalCreate(): void {
    this.dialog.open(ModalProductsComponent, {
      width: '50%',
      height: '270px',
      data: {id: 0}
    }).afterClosed().subscribe(() => this.getListProducts());
  }

  openModalEdit(product: any): void {
    this.dialog.open(ModalProductsComponent, {
      width: '50%',
      height: '270px',
      data: {
        id: product.id,
        product: product.product,
        description: product.description,
        value: product.value
      }
    }).afterClosed().subscribe(() => this.getListProducts());
  }

}

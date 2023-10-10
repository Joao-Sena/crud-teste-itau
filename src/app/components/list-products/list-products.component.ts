import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { ModalProductsComponent } from '../modal-products/modal-products.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  productsList: any;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListProducts() {
    this.productsService.getAllProducts().pipe(take(1)).subscribe(
      (response: any) => {
        
        this.productsList = response;
        this.dataSource = new MatTableDataSource<any>(this.productsList);

      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).pipe(take(1)).subscribe(
      (response: any) => {

        this.snackBar.open('O produto foi deletado com sucesso!', 'OK', {
          panelClass: ['itau-snackbar'],
          verticalPosition: 'bottom',
          duration: 7000
        });

        this.getListProducts();
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  openModalCreate() {
    this.dialog.open(ModalProductsComponent, {
      width: '50%',
      height: '270px',
      data: {id: 0}
    }).afterClosed().subscribe(() => this.getListProducts());
  }

  openModalEdit(product: any) {
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

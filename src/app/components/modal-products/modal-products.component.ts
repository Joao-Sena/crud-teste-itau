import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ProductsServiceService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-modal-products',
  templateUrl: './modal-products.component.html',
  styleUrls: ['./modal-products.component.scss']
})
export class ModalProductsComponent implements OnInit {

  // Type 0 = Create / Type 1 = Update
  typeAction: number;
  formProduct: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private productService: ProductsServiceService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if(this.data.id === 0) {
      this.typeAction = 0;
    } else {
      this.typeAction = 1;
    }
    
    this.buildForm();
  }

  saveProduct() {
    const dataForm = this.formProduct.getRawValue();

    this.productService.insertProduct(dataForm).pipe(take(1)).subscribe(
      (response: any) => {

        this.dialogRef.close();
        this.snackBar.open('O produto cadastrado com sucesso!', 'OK', {
          panelClass: ['itau-snackbar'],
          verticalPosition: 'bottom',
          duration: 7000
        });

      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  editProduct() {
    const dataForm = this.formProduct.getRawValue();

    this.productService.updateProduct(dataForm).pipe(take(1)).subscribe(
      (response: any) => {

        this.dialogRef.close();
        this.snackBar.open('O produto editado com sucesso!', 'OK', {
          panelClass: ['itau-snackbar'],
          verticalPosition: 'bottom',
          duration: 7000
        });

      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  buildForm() {
    this.formProduct = this.formBuilder.group({
      id: 0,
      product: ['', [Validators.required]],
      value: [null, [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(80)]],
    });

    if(this.typeAction === 1) {
      this.formProduct.patchValue({
        "id": this.data.id,
        "product": this.data.product,
        "value": this.data.value,
        "description": this.data.description
      });

    }
  }

}

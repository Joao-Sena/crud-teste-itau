import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalProductsComponent } from './modal-products.component';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { of } from 'rxjs';

describe('ModalProductsComponent', () => {
  let component: ModalProductsComponent;
  let fixture: ComponentFixture<ModalProductsComponent>;
  let productService: jasmine.SpyObj<ProductsServiceService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ModalProductsComponent>>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductsServiceService', ['insertProduct', 'updateProduct']);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ModalProductsComponent],
      providers: [
        FormBuilder,
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: 1, product: 'Product 1', value: 10, description: 'Description 1' }
        },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: ProductsServiceService, useValue: productService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.formProduct).toBeInstanceOf(FormGroup);
  });

  it('should call saveProduct on save', () => {
    component.saveProduct();
    expect(productService.insertProduct).toHaveBeenCalled();
  });

  it('should call editProduct on edit', () => {
    component.typeAction = 1;
    component.editProduct();
    expect(productService.updateProduct).toHaveBeenCalled();
  });

  it('should close the dialog on successful save', () => {
    productService.insertProduct.and.returnValue(of({value: []}));
    component.saveProduct();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should display a success snackbar on successful save', () => {
    productService.insertProduct.and.returnValue(of({value: []}));
    component.saveProduct();
    expect(snackBar.open).toHaveBeenCalledWith('O produto cadastrado com sucesso!', 'OK', {
      panelClass: ['itau-snackbar'],
      verticalPosition: 'bottom',
      duration: 7000
    });
  });

});

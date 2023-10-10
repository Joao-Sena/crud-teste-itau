import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProductsComponent } from './list-products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductsServiceService } from 'src/app/services/products-service.service';
import { of } from 'rxjs';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let productService: ProductsServiceService;

  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  const mockMatSnackBar = {
    open: jasmine.createSpy('open'),
  };

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ListProductsComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule], // Importe o MatSnackBarModule
      providers: [
        ProductsServiceService,
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(MatDialog, { useValue: mockMatDialog });
    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve obter a lista de produtos corretamente', () => {
    const mockProducts = [{ id: 1, product: 'Produto 1' }, { id: 2, product: 'Produto 2' }];

    // Espiar o serviço e fornecer uma resposta simulada
    spyOn(productService, 'getAllProducts').and.returnValue(of(mockProducts));

    component.getListProducts();
    fixture.detectChanges();

    expect(component.productsList).toEqual(mockProducts);
  });

  it('should delete product successfully', () => {
    const productId = 1;

    spyOn(productService, 'deleteProduct').and.returnValue(of({}));

    component.deleteProduct(productId);
  });


});

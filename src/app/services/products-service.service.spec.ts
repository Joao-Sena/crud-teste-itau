import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsServiceService } from './products-service.service';

describe('ProductsServiceService', () => {
  let service: ProductsServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsServiceService],
    });
    service = TestBed.inject(ProductsServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const dummyProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    service.getAllProducts().subscribe((products) => {
      expect(products).toEqual(dummyProducts);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toEqual('GET');

    req.flush(dummyProducts);
  });

  it('should insert a product', () => {
    const newProduct = { id: 3, name: 'New Product' };

    service.insertProduct(newProduct).subscribe((response) => {
      expect(response).toEqual(newProduct);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toEqual('POST');

    req.flush(newProduct);
  });

  it('should update a product', () => {
    const updatedProduct = { id: 1, name: 'Updated Product' };

    service.updateProduct(updatedProduct).subscribe((response) => {
      expect(response).toEqual(updatedProduct);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toEqual('PUT');

    req.flush(updatedProduct);
  });

  it('should delete a product', () => {
    const productId = 1;

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/products/${productId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(null);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

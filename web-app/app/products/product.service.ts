import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    // Web API Port
    private baseUrl = 'http://localhost:52768/api/products';

    constructor(private http: Http) {

    }

    // Get all product(s)
    getProducts(): Observable<IProduct[]> {
        return this.http.get(`${this.baseUrl}`)
            .map(this.extractData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // Get product by id
    getProductById(id: number): Observable<IProduct> {
        if(id === 0){
            return Observable.create((observer: any) => {
                observer.next(this.initializaProduct());
                observer.complete();
            });
        }
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // Delete product 
    deleteProduct(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    // Gate way to create or update product
    saveProduct(product: IProduct): Observable<IProduct> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); 

        if(product.id === 0) {
            return this.createProduct(product, options);
        }

        return this.updateProduct(product, options);
    }

    // Create product
    private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        product.id = undefined;
        return this.http.post(this.baseUrl, product, options)
            .map(this.extractData)
            .do(data => console.log('createProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // Update product
    private updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        const url = `${this.baseUrl}/${product.id}`;
        return this.http.put(url, product, options)
            .map(() => product)
            .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // Function to extract data when web-api response something
    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    // Return error when request or response has a crash
    private handleError(error: Response){
        console.error(error);
        return  Observable.throw(error.json().error || 'Server error');
    }

    // To initializa product when staying in create mode
    initializaProduct(): IProduct {
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''],
            price: null,
            releaseDate: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    }
}
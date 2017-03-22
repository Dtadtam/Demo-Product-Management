import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    //private productUrl = 'api/products/products.json';
    private baseUrl = 'api/products';

    constructor(private http: Http) {

    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get(`${this.baseUrl}`)
            .map((response: Response) => <IProduct[]> response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

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

    deleteProduct(id: number): Observable<Response> {
        return null;
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        return null;
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response){
        console.error(error);
        return  Observable.throw(error.json().error || 'Server error');
    }

    initializaProduct(): IProduct {
        return {
            productId: 0,
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
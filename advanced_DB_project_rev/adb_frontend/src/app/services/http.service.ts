import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  mysql_result: Observable<Result[]>
  mongodb_result: Observable<Result[]>
  neo4j_result: Observable<Result[]>
  constructor(private http: HttpClient) { }

  mysql_query_1( query ) {
    let url = 'http://localhost:5000/mysql/query9';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_2( query ) {
    let url = 'http://localhost:5000/mysql/query1';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_3( query ) {
    let url = 'http://localhost:5000/mysql/query3';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_4( query ) {
    let url = 'http://localhost:5000/mysql/query5';
    return this.http.post<Result[]>(url, query, httpOptions);
  }
  mysql_query_4_view( query ) {
    let url = 'http://localhost:5000/mysql/query6';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_5( query ) {
    let url = 'http://localhost:5000/mysql/query10';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_6( query ) {
    let url = 'http://localhost:5000/mysql/query2';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_7( query ) {
    let url = 'http://localhost:5000/mysql/query7';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_8( query ) {
    let url = 'http://localhost:5000/mysql/query8';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_9( query ) {
    let url = 'http://localhost:5000/mysql/query9';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_10( query ) {
    let url = 'http://localhost:5000/mysql/query7';
    return this.http.post<Result[]>(url, query, httpOptions);
  }
  mysql_query_10_view( query ) {
    let url = 'http://localhost:5000/mysql/query8';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_11_fact( query ) {
    let url = 'http://localhost:5000/mysql/query4';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mysql_query_11_view( query ) {
    let url = 'http://localhost:5000/mysql/query11/view';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  // Neo4j
  neo4j_query_1( query ){
    let url = 'http://localhost:5000/neo4j/query7';
    return this.http.post<Result[]>(url, query, httpOptions);
  }
  neo4j_query_2( query ) {
    let url = 'http://localhost:5000/neo4j/query1';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  neo4j_query_3( query ) {
    let url = 'http://localhost:5000/neo4j/query3';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  neo4j_query_4( query ) {
    let url = 'http://localhost:5000/neo4j/query5';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  neo4j_query_5( query ) {
    let url = 'http://localhost:5000/neo4j/query8';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  neo4j_query_6( query ) {
    let url = 'http://localhost:5000/neo4j/query2';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  neo4j_query_7( query ) {
    let url = 'http://localhost:5000/neo4j/query7';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  neo4j_query_8( query ) {
    let url = 'http://localhost:5000/neo4j/query8';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  neo4j_query_9( query ) {
    let url = 'http://localhost:5000/neo4j/query9';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  neo4j_query_10( query ) {
    let url = 'http://localhost:5000/neo4j/query6';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  neo4j_query_11( query ) {
    let url = 'http://localhost:5000/neo4j/query4';
    return this.http.post<Result[]>(url, query, httpOptions);
  }
  
  // MongoDB
  //The lowest price of each commodity in the particular market
  mongodb_query_1( query ){
    let url = 'http://localhost:5000/mongodb/query7';
    return this.http.post<Result[]>(url, query, httpOptions);
  }
  //The average price of commodity “Bread” in each country
  mongodb_query_2( query ) {
    let url = 'http://localhost:5000/mongodb/query1';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

//The highest price of commodity “Rice” in each market type in each country
  mongodb_query_3( query ) {
    let url = 'http://localhost:5000/mongodb/query3';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

//The average price of commodity “Bread” each year in the country “Afghanistan”
  mongodb_query_4( query ) {
    let url = 'http://localhost:5000/mongodb/query5';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

//The commodity (name) which has highest price in the particular market
  mongodb_query_5( query ) {
    let url = 'http://localhost:5000/mongodb/query8';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

//The average price of commodity “Wheat” in each locality of the country “Afghanistan”
  mongodb_query_6( query ) {
    let url = 'http://localhost:5000/mongodb/query2';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mongodb_query_7( query ) {
    let url = 'http://localhost:5000/mongodb/query7';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mongodb_query_8( query ) {
    let url = 'http://localhost:5000/mongodb/query10';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

  mongodb_query_9( query ) {
    let url = 'http://localhost:5000/mongodb/query9';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

//The average price of commodity “Bread” each year in the country “Afghanistan”
  mongodb_query_10( query ) {
    let url = 'http://localhost:5000/mongodb/query6';
    return this.http.post<Result[]>(url, query, httpOptions);
  }

//The lowest price of commodity “Bread” in each market in the country “Afghanistan”
  mongodb_query_11( query ) {
    let url = 'http://localhost:5000/mongodb/query4';
    return this.http.post<Result[]>(url, query, httpOptions);
  }
}
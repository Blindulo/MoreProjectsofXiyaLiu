import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { Query } from 'src/app/models/Query';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query10',
  templateUrl: './query10.component.html',
  styleUrls: ['./query10.component.css']
})
export class Query10Component implements OnInit {
  mysqlResults: Result[];
  mysqlResults2: Result[];
  mongodbResults: Result[];
  mongodbResults2: Result[];
  neo4jResults: Result[];
  query: Query = {
    country: '',
    product_name: ''
  }
  constructor(
    private httpService: HttpService,
    private router: Router,
  ) { }
  ngOnInit() {
  }
  onSubmit({ value }: { value: Query }) {
      this.httpService.mysql_query_10(this.query).subscribe(results => {
        this.mysqlResults = results;
      });
      this.httpService.mysql_query_10_view(this.query).subscribe(results => {
        this.mysqlResults2 = results;
      });
      this.httpService.mongodb_query_10(this.query).subscribe(results => {
        this.mongodbResults = results;
      });
      this.httpService.neo4j_query_10(this.query).subscribe(results => {
        this.neo4jResults = results;
      });
    }
    onCountrySelected(value:string){
      this.query.country=value;
      this.httpService.mongodb_query_9(this.query).subscribe(results => {
        this.mongodbResults2 = results;
      });
      console.log("the selected value is " + value);
    }
}


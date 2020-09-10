import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { Query } from 'src/app/models/Query';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { query } from '@angular/core/src/render3';

@Component({
  selector: 'app-query6',
  templateUrl: './query6.component.html',
  styleUrls: ['./query6.component.css']
})
export class Query6Component implements OnInit {
  mysqlResults: Result[];
  mongodbResults: Result[];
  mongodbResults2: Result[];
  neo4jResults: Result[];
  perfromance:any;
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
      this.httpService.mysql_query_6(this.query).subscribe(results => {
        this.mysqlResults = results;
        // for(var i in this.mysqlResults){
        //   this.mysqlResults[i]["gmDate"]=this.mysqlResults[i]["gmDate"].substr(0,10);
        // } 
      });
      this.httpService.mongodb_query_6(this.query).subscribe(results => {
        this.mongodbResults = results;
      });
      this.httpService.neo4j_query_6(this.query).subscribe(results => {
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


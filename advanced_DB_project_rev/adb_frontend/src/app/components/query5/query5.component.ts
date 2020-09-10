import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { Query } from 'src/app/models/Query';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query5',
  templateUrl: './query5.component.html',
  styleUrls: ['./query5.component.css']
})
export class Query5Component implements OnInit {
  mysqlResults: Result[];
  mongodbResults: Result[];
  mongodbResults2: Result[];
  neo4jResults: Result[];
  query: Query = {
    country: '',
    market: '',
  }
  constructor(
    private httpService: HttpService,
    private router: Router,
  ) { }
  ngOnInit() {
  }
  onSubmit({ value }: { value: Query }) {
      this.httpService.mysql_query_5(this.query).subscribe(results => {
        this.mysqlResults = results;
      });
      this.httpService.mongodb_query_5(this.query).subscribe(results => {
        this.mongodbResults = results;
        // console.log(this.mongodbResults);
      });
      this.httpService.neo4j_query_5(this.query).subscribe(results => {
        this.neo4jResults = results;
      });
    }
    onCountrySelected(value:string){
      this.query.country=value;
      this.httpService.mongodb_query_8(this.query).subscribe(results => {
        this.mongodbResults2 = results;
      });
      console.log("the selected value is " + value);
    }
}


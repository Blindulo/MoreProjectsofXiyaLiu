import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { Query } from 'src/app/models/Query';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query2',
  templateUrl: './query2.component.html',
  styleUrls: ['./query2.component.css']
})
export class Query2Component implements OnInit {
  mysqlResults: Result[];
  mongodbResults: Result[];
  neo4jResults: Result[];
  performance:any;
  query: Query = {
    product_name: ''
  }
  constructor(
    private httpService: HttpService,
    private router: Router,
  ) { }
  ngOnInit() {
  }
  onSubmit({ value }: { value: Query }) {
    console.log(value);
      this.httpService.mysql_query_2(this.query).subscribe(results => {
        this.mysqlResults = results;
      });
      this.httpService.mongodb_query_2(this.query).subscribe(results => {
        // this.performance = results;
        this.mongodbResults = results;
      });
      this.httpService.neo4j_query_2(this.query).subscribe(results => {
        // this.performance = results;
        this.neo4jResults = results;
      });
    }
}


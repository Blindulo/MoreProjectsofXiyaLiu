import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { Query } from 'src/app/models/Query';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query3',
  templateUrl: './query3.component.html',
  styleUrls: ['./query3.component.css']
})
export class Query3Component implements OnInit {
  mysqlResults: Result[];
  mongodbResults: Result[];
  neo4jResults: Result[];
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
      this.httpService.mysql_query_3(this.query).subscribe(results => {
        this.mysqlResults = results;
        // for(var i in this.mysqlResults){
        //   this.mysqlResults[i]["gmDate"]=this.mysqlResults[i]["gmDate"].substr(0,10);
        // } 
      });
      this.httpService.mongodb_query_3(this.query).subscribe(results => {
        this.mongodbResults = results;
      });
      this.httpService.neo4j_query_3(this.query).subscribe(results => {
        this.neo4jResults = results;
      });
    }
}


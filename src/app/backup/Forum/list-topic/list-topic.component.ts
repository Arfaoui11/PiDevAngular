import { Component, OnInit } from '@angular/core';


import {MatSnackBar} from "@angular/material/snack-bar";

import {Router} from "@angular/router";
import {TopicService} from "../Services/topic.service";
import {Topic} from "../../../core/model/Topic";


@Component({
  selector: 'app-list-topic',
  templateUrl: './list-topic.component.html',
  styleUrls: ['./list-topic.component.css']
})
export class ListTopicComponent implements OnInit {

  ///////Affichage////////////

  topics: Topic[];

  constructor(private services: TopicService, private router: Router,private snackbar:MatSnackBar) {

  }

  ngOnInit(): void {
    this.services.retrievetopic().subscribe(data => {
      console.log(data);
      this.topics = data;
    });
  }
///////////////Suppression//////////////////////////
  deleteTopic(i :number)
  {
    console.log(i);
    this.services.deleteTopic(i)
      .subscribe(response => {
        this.topics = this.topics.filter(item => item.idTopic !== i);
      });
    this.snackbar.open(' delete successfully', 'Undo', {
      duration: 2000
    });
  }
  ///////////////////////////////



///////////////////////////////////
}

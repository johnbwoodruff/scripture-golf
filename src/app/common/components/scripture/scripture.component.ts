import { Component, OnInit, Input } from '@angular/core';
import { Scripture } from '../../interfaces/scripture';

@Component({
  selector: 'app-scripture',
  templateUrl: './scripture.component.html',
  styleUrls: ['./scripture.component.scss']
})
export class ScriptureComponent implements OnInit {
  @Input() scripture: Scripture;

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  constructor(private networkService: NetworkService) { }

  ngOnInit(): void {
    this.fullForm = ''
    this.value = '';
    this.errorString = '';
  }

  fullForm: any;
  value: any;
  errorString: string;

  fullclear() {
    this.errorString = '';
    this.fullForm = '';
    this.value = '';
  }

  pressKey(val) {
    this.errorString = '';
    if ((val == '/' || val == '+' || val == '*' || val == '-') && this.value != '') {
      this.fullForm = this.value.substring(1);
    }
    this.fullForm = this.fullForm + val;
    this.value = '';
  }

  evaluate() {
    try {
      if (this.fullForm != '') {
        if (isNaN(parseInt(eval(this.fullForm)))) {
          this.errorString = 'Do not divide by zero!'
        }
        else {
          this.value = '=' + eval(this.fullForm);
        }
      }
      else {
        this.errorString = 'Field is empty!'
      }
    } catch (ex) {
      this.errorString = ex.message;
    }
  }

  backSpace() {
    if (this.fullForm.length >= 1) {
      this.fullForm = this.fullForm.slice(0, -1);
    }
  }

  writeValue() {
    if (this.value != '') {
      this.networkService.writeValue({ number: this.value.substring(1) }).subscribe(
        res => {
          alert(res);
        }
      );
    }
    else {
      this.errorString = 'Field is empty!';
    }
  }

  readValue() {
    this.networkService.readValue().subscribe(
      res => {
        if (res != null) {
          this.fullForm = res;
        }
        else {
          this.errorString = 'First save something!'
        }
        this.value = '';
      }
    );
  }

}

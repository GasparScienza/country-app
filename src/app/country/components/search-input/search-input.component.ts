import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  txtSearch = output<string>();
  txtPlaceHolder = input<string>();
  onSearch(value: string) {
    this.txtSearch.emit(value);
  }
}

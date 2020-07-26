import { Component } from '@angular/core';
import { productList, existingLists } from './mock';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-stencil';
  productList = productList;

  shoppingLists = existingLists;

  shoppingListsBinded = JSON.stringify(this.shoppingLists);

  lastListId = 3;

  listName = new FormControl('');

  removeList(id: number) {
    const index = this.shoppingLists.findIndex((el) => el.id === id);
    this.shoppingLists.splice(index, 1);
    this.shoppingListsBinded = JSON.stringify(this.shoppingLists);
  }

  addList(name: string) {
    this.lastListId++;
    this.shoppingLists.push({
      name,
      products: [],
      id: this.lastListId,
    });
    this.listName.setValue(null);
    this.shoppingListsBinded = JSON.stringify(this.shoppingLists);
  }

  addListStencil(ev) {
    this.addList(ev.detail.listName);
  }

  toggleSelection(ev) {
    const { listId, prodId } = ev.detail;
    const listIndex = this.shoppingLists.findIndex((el) => el.id === listId);
    const prodIndex = this.shoppingLists[listIndex].products.findIndex(
      (el) => el === prodId
    );

    if (prodIndex > 0) {
      this.shoppingLists[listIndex].products.splice(prodIndex, 1);
    } else {
      this.shoppingLists[listIndex].products.push(prodId);
    }

    this.shoppingListsBinded = JSON.stringify(this.shoppingLists);

  }
}

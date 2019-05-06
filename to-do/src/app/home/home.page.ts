import { Component, NgZone } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public todos = ['Item 1', 'Item 2', 'Item 3'];

  constructor(public alertController: AlertController, private _ngZone: NgZone){

  }

    async presentAddNewPrompt(){
      console.log('Add Clicked');
      const addTodoAlert = await this.alertController.create({
        header: 'Add a Todo',
        message: 'Enter your todo',
        inputs: [
          {
            type: 'text',
            name: 'newTodoItem',
            placeholder: 'New Item'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Confirm Cancel Add');
            }
          }, 
          {
            text: 'OK',
            handler: (inputData) => {
              let todo;
              if (inputData.newTodoItem) {
                todo = inputData.newTodoItem.trim();
                if (todo !== ''){
                  this._ngZone.run(() => {
                      this.todos.push(todo);
                  });
                } 
                else{
                  console.log('The input string is empty.');
                }
              } 
              else{
                console.log('The input string is not set.');
              }
              return todo;
            }
          }
        ]
      });
    await addTodoAlert.present();
  }

  async deleteItem(todo){
    console.log('Delete Clicked');
    const removeTodoAlert = await this.alertController.create({
      header: 'Delete a Todo',
      message: 'Are you sure you want to delete this To Do?',
      buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
                console.log('Confirm Cancel Delete');
            }
          }, 
          {
            text: 'OK',
            handler: (inputData) => {
              console.log("Attemping to delete...");
              for(let i = 0; i < this.todos.length; i++){
                if(this.todos[i] == todo){
                  this.todos.splice(i, 1);
                }
              }
            }
          }
        ]
    });
    await removeTodoAlert.present()
  }
}
import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css'

export default class App extends Component {
    constructor() {
        super();
        this.maxId = 100;

        this.createTodoItem = (label) => {
            return {
                label,
                important: false,
                done: false,
                id: this.maxId++
            };
        };

        this.state = {
            todoData: [
                this.createTodoItem('Drink Coffee'),
                this.createTodoItem('Make Awesome App'),
                this.createTodoItem('Have a lunch')
            ],
            term: ''
        };

        this.deleteItem = (id) => {
            this.setState(({ todoData }) => {
                const idx = todoData.findIndex((el) => el.id === id);

                const newArray = [
                    ...todoData.slice(0, idx),
                    ...todoData.slice(idx+1)
                ];

                return {
                    todoData: newArray
                };
            });
        };

        this.addItem = (text) => {
            const newItem = this.createTodoItem(text);
            
            this.setState(({ todoData }) => {
                const newArr = [
                    ...todoData,
                    newItem
                ];
                return {
                    todoData: newArr
                }
            });
        };

        this.toggleProperty = (arr, id, propName) => {
            const index = arr.findIndex((el) => el.id === id);
                
            const oldItem = arr[index];
            const newItem = {...oldItem, [propName]: !oldItem[propName]};

            return [
                ...arr.slice(0, index),
                newItem,
                ...arr.slice(index+1)
            ];
        };

        this.onToggleImportant = (id) => {
            this.setState(({ todoData }) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                };
             });
        };

        this.onToggleDone = (id) => {
            this.setState(({ todoData }) => {
               return {
                   todoData: this.toggleProperty(todoData, id, 'done')
               };
            });
        };

        this.onSearchChange = (term) => {
            this.setState({ term });
        }
        
        this.search = (items, term) => {
            if(term.length === 0) {
                return items
            }

            return items.filter((item) => {
                return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
            });
        }
    }
    
    render() {
        const { todoData, term } = this.state;
        const visibleItems = this.search(todoData, term);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
        <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount}/>
            <div className="top-panel d-flex">
                <SearchPanel 
                    onSearchChange={this.onSearchChange}/>
                <ItemStatusFilter />
            </div>
            <TodoList 
                todos={visibleItems}
                onDeleted={ this.deleteItem}
                onToggleDone={this.onToggleDone}
                onToggleImportant={this.onToggleImportant} />
            <ItemAddForm onItemAdded={this.addItem} />      
        </div>
        );
    }       
};
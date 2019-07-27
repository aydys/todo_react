import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {
    constructor() {
        super();
        this.onLabelClick = () => {
            console.log(`Done: ${this.props.label}`);
        };
    }

    render() {
        const { label, important=false } = this.props;
        const style = {
            color: important ? 'tomato' : 'black',
            fontWeight: important ? 'bold' : 'normal'
        };
    
        return (
            <span className="todo-list-item">
                <span
                    className="todo-list-item-label"
                    style={ style }
                    onClick={ this.onLabelClick }>
                    {label}
                </span>
                <button type="button"
                        className="btn btn-outline-success btn-sm float-right">
                    <i className='fa fa-exclamation' />
                </button>
                <button type="button"
                        className="btn btn-outline-success btn-sm float-right">
                    <i className='fa fa-trash-o' />
                </button>
            </span>
        );
    }
};
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import lo from 'lodash'

import Form from './Taskform'

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'tasks':[]
    };
  }

  handleItemClick = (event) => {
    const list = document.querySelectorAll('.lstTask')
    for(let i = 0; i < list.length; i++){
      list[i].classList.remove('active')
    }
    const elem = event.target
    elem.classList.add('active')

  }

  handleAddClick = async (event) => {
    event.preventDefault()
    const text = document.querySelector('#task')
    const options = await {method:'POST',
    headers:{
          'Accept':'application/json; charset=utf-8',
          'Content-Type':'application/json',
          'Authorization':'',
        },
        mode: 'cors',
        body: JSON.stringify({name: text.value}),
    }
    const response = await fetch('http://localhost:3001/tasks',options)

    if(await response.status === 404) return console.log('Error')

    const data = await response.json()
    this.setState( { 'tasks': this.state.tasks.concat(data) } )
    text.value = ''
  }

  handleClearClick = async (event) => {

    event.preventDefault();
    const options = await {method: 'DELETE',
                headers: {
                  'Accept':'application/json; charset=utf-8',
                  'Content-Type':'application/json'
                  },
                mode: 'cors'
                }
    await fetch('http://localhost:3001/tasks',options)
    this.setState({'tasks': [] });

  }

  handleDeleteClick = async (event) =>{
    event.preventDefault()
    const elem = event.target
    const options = await {method: 'DELETE',
                headers: {
                  'Accept':'application/json; charset=utf-8',
                  'Content-Type':'application/json'
                  },
                mode: 'cors'
                }
    const res = await fetch(`http://localhost:3001/tasks/${elem.id}`,options)
    if (res.status === 200){
      const state = lo.filter(this.state.tasks, function(o){ return o._id !== elem.id } )
      this.setState( {'tasks': state} )
    }
  }

  async componentDidMount() {
    const options = await {method: "GET",
                headers: {
                  'Accept':'application/json; charset=utf-8',
                  'Content-Type':'application/json'
                  },
                mode: 'cors'
                }
    const response = await fetch('http://localhost:3001/tasks',options)
    const data = await response.json()
    this.setState({tasks: data});
  }
//, border: '1px dotted grey'
  render() {
    return (
      <div className="col-md-6 offset-md-3" style={{ height: '90vh' }}>
        <Form add={ this.handleAddClick } removeAll={ this.handleClearClick }></Form>
        <ul className="list-group" onClick={this.handleItemClick} id='lstTasks'>
          { this.state.tasks.length > 0 && this.state.tasks.map(
            (item,i) => {
              return(
                <li className="list-group-item lstTask justify-content-between" key={item._id} id={item._id}>

                    <p>{item.name}&nbsp;&nbsp;&nbsp;<small><em>{formattedDate(new Date(item.Create_date))}</em></small></p>
                    <button type="button"
                      className="btn btn-link btn-sm"
                      style={{ marginLeft: '100px' }}
                      onClick={ this.handleDeleteClick }
                      id={ item._id }>X</button>

                </li>
              )
            }
          )}
        </ul>

      </div>
    );
  }

}

export default Content;


function formattedDate(d = new Date()) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${month}/${day}/${year}`;
}

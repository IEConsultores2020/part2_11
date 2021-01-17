import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Findit from './components/Findit'

import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName] = useState('a new name')
  const [ newNumber, setNewNumber] = useState('a new number')
  const [ showAll, setShowAll] = useState(true)

  useEffect (() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.name, response.number)
      })
  },[])

  
  console.log('render', persons.length, 'persons')
  
  

  const [ newFilter, setFilter] = useState('a new filter')


  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name === newFilter)


  const addPerson = (event) => {
    event.preventDefault()
    const personObject =
    {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const pos = Findit(persons,newName)

    let msj =  newName + ' is already added to phonebook '

    console.log(msj)
    if (pos>-1) {  
      window.alert(msj)
    }
    else {
      console.log('SetPersons(persons.concat(personObject))')
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }  

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  return (
    <div>
      <h2>PhoneBook</h2>
      <form onSubmit={addPerson}>
        <h3> Nombre</h3>
        <input value={newName}
               onChange={handleNameChange}
               />
        <h3> Teléfonos </h3>                     
        <input value={newNumber} 
               onChange={handleNumberChange}
               />  
               <p></p>                            
        <button type="submit">add</button>
      </form>

      <h1>Telephone List</h1>
      <h1>Name | Phone</h1>
      <div>
      <input  value={newFilter}
              onChange={handleFilterChange} 
       />
        <button onClick={() => setShowAll(!showAll)}>
          show {Findit(persons,newFilter) ? 'Filter' : 'all'}
        </button>
      </div>      
      <ul>
        {personsToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>    
  );
  }

export default App;

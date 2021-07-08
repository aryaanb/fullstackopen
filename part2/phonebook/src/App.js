import React, { useEffect, useState } from 'react'
import AddName from './components/AddName'
import Filter from './components/Filter';
import Numbers from './components/Numbers'
// import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filter, setFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    console.log("effect");
    // axios.get return a promise, once that promise is resolved we use the then 
    // methon to perform an action on the result.
    // axios
    //   .get("http://localhost:3001/persons")
    //   .then(response => {
    //     console.log(response)
    //     setPersons(response.data)
    //   });
    // getPersons returns a promise with the array of person as resolved value
    personService
      .getPersons()
      .then(response => setPersons(response))
  }, []);

  useEffect(() => {
    if (filter === "") {
      setIsFiltering(false);
    } else {
      // we make filter a regex, so we can use the match method, i means ignore case
      let reg = new RegExp(filter, 'i');
      // loop through persons array and store all persons whose name match in filtered
      let filtered = persons.filter((person) => person.name.match(reg));
      // set filters to filtered which is an array of persons whose match search
      setFilters(filtered);
      setIsFiltering(true);
    }
  }, [persons, filter])


  const handleNewName = (event) => {
    // the target is the input field, and value is newName
    setNewName(event.target.value);
  }

  const handleNewNum = (event) => {
    setNewNum(event.target.value);
  }

  const addPerson = (event) => {
    // the default action of submitting a form is to reload the screen
    event.preventDefault();

    // issues a warning if we add the same name again
    if (persons.filter((person) => person.name === newName).length > 0) {
      // this is a template string
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.filter(per => per.name === newName)[0]
        const newPerson = { ...person, number: newNum }
        personService
          .update(person.id, newPerson)
          .then(response => {
            // change the state of the person so that the updated num is visible
            setPersons(persons.map(per => per.id === response.id ? response : per));
            console.log(response);
          })
      }
      return;
    }
    // we add people to the json server db with post
    // the json server will make the id for us
    const newPerson = {
      name: newName,
      number: newNum
    }
    // axios
    //   .post('http://localhost:3001/persons', newPerson)
    //   .then(response => {
    //     console.log(response);
    //     setPersons(persons.concat(response.data));
    //     setNewName('');
    //     setNewNum('');
    //   })

    // create posts to the server and returns the data that was posted
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNum('');
      })

  }

  const handleFilter = (event) => {
    // set what we type as the filter
    /*
      We add the rest of the filtering logic in useEffect because setFilter is async
      and the state will be one step behind the actual value value in the filter
      When we put it in useEffect the logic will only apply when the state changes
    */
    setFilter(event.target.value);
  }

  const handleDelete = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(per => per.id !== person.id))
          // remove the deleted person from the persons state
          console.log('deleted', person.name)
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      ></Filter>
      <h2>Add new person</h2>
      <AddName
        handleNewName={handleNewName}
        addPerson={addPerson}
        newName={newName}
        newNum={newNum}
        handleNewNum={handleNewNum}
      ></AddName>
      {/* if there are no people in filters array ie no matches  */}
      {!isFiltering > 0 && <Numbers persons={persons} handleDelete={handleDelete}></Numbers>}
      {isFiltering > 0 && <Numbers persons={filters} handleDelete={handleDelete}></Numbers>}
    </div>
  )
}

export default App

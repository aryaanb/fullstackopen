const Numbers = ({persons, handleDelete}) => {
	return ( 
		<div>
			<h2>Numbers</h2>
			{persons.map((person) => {
				return (
					<div key={person.name}>
						{person.name} {person.number} <button onClick={() => handleDelete(person)}>Delete</button>
					</div>
				)
			})}
		</div>

	 );
}
 
export default Numbers;
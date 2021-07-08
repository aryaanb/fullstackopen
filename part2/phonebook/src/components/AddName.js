const AddName = ({handleNewName, addPerson, newName, newNum, handleNewNum}) => {
	return ( 
		<form onSubmit={addPerson}>
			<div>
				name: <input
					value={newName}
					onChange={handleNewName}
				/>
			</div>
			<div>
				number: <input
							value={newNum}
							onChange={handleNewNum}
						></input>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	 );
}
 
export default AddName;
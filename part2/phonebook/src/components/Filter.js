const Filter = ({filter, handleFilter}) => {
	return ( 
		<form>
			<div>
				filter: <input
							value={filter}
							onChange={handleFilter}
						/>
			</div>
		</form>
	 );
}
 
export default Filter;
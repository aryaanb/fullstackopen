const Total = ({ parts }) => {
  return (
    <>
      <p>
        Number of exercises {parts.reduce((acc, curr) => ({ exercises: acc.exercises + curr.exercises })).exercises}
      </p>
    </>
  );
}

export default Total;
import { useState } from "react";

function Person() {
  const personObj = {
    name: "Pobx",
    age: 19,
    job: "Programmer",
  };

  const [person, setPerson] = useState(personObj);

  const updatePerson = () => {
    setPerson((prev) => {
      return { ...prev, name: "Geidtiphong Singseewo", age: 34 };
    });
  };

  return (
    <>
      <h1>Person Properties</h1>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <p>Job: {person.job}</p>
    </>
  );
}

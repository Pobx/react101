// import React, { memo } from "react";
import React from "react";

function Todos({ todos }) {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return (
          <p key={index}>
            {index + 1} {todo}
          </p>
        );
      })}
    </>
  );
}
// export default memo(Todos);
export default Todos;

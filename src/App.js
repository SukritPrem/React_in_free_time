import { useState, useReducer } from "react";
import Box from "./Box";
const reducer = (state, action) => {
  switch (action.type) {
    case "changed_board": {
      return {
        value: action.value
      };
    }
    default: {
      console.log("Something is wrong");
    }
  }
};
const reducer_win = (state, action) => {
  switch (action.type) {
    case "changed_array_for_win": {
      return {
        value: action.value
      };
    }
    default: {
      console.log("Something is wrong2");
    }
  }
};

export default function App() {
  const [num, setnum] = useState(0); // for receive value from user
  const [square, setSquare] = useState({}); // set square
  const initialState = { value: {} };
  const [colunm, setcolunm] = useState(0); // set box to colunm
  const [state, dispatch] = useReducer(reducer, initialState); //set value for next play
  const [nextplay, setnextplay] = useState(false); // every play
  const [turn, setturn] = useState(false); //x or o
  const initialwinner = { value: {} };
  const [checkwinner, setwinner] = useReducer(reducer_win, initialwinner);
  const [square_win, setSquare_win] = useState({}); // set square
  const [square1, setSquare1] = useState({});
  function handleChange(e) {
    let num1 = Number(e.target.value);
    // console.log(num1);
    setnum(num1);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(num);
    setcolunm(num);
    setnextplay(false);
    setturn(false);
    dispatch({
      type: "changed_board",
      value: {}
    });
    setwinner({
      type: "changed_array_for_win",
      value: {}
    });
    setSquare({});
    const loop = num * num;
    setSquare(() => {
      // console.log(...squarea);
      const newSquares = [];
      for (let i = 0; i < loop; i++) {
        const currentSquare = { id: i, st: "" };
        newSquares.push(currentSquare);
      }
      return newSquares;
    });
    setSquare_win(() => {
      let array1 = [];
      let arrays = [];
      let loop_win = loop;
      let x = 0;
      while (loop_win > 0) {
        loop_win = loop_win - 1;
        array1.push(x);
        x = x + 1;
      }
      console.log(array1);
      // console.log(num);
      let countx = 0;
      let county = num;
      for (let i = 0; i < num; i++) {
        arrays.push(array1.slice(countx, county));
        // console.log(x);
        countx = countx + num;
        county = county + num;
      }

      let array_c = [];
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
          array_c.push(arrays[j][i]);
        }
      }

      countx = 0;
      county = num;
      for (let i = 0; i < num; i++) {
        arrays.push(array_c.slice(countx, county));
        countx = countx + num;
        county = county + num;
      }
      array_c = [];
      for (let i = 0; i < num; i++) {
        array_c.push(arrays[i][i]);
      }
      arrays.push(array_c);
      array_c = [];
      let j = 0;
      for (let i = num - 1; 0 <= i; i--) {
        array_c.push(arrays[j][i]);
        j++;
      }
      arrays.push(array_c);
      console.log(arrays);
      // console.log(arrays);
    });
    dispatch({
      type: "changed_board",
      value: square
    });
  }

  let cssProperties = {};
  cssProperties["--columns-count"] = colunm;
  // console.log(square);

  function toggle(key) {
    let square_clone = [];
    if (nextplay === false) {
      square_clone = square.map((square, index) => {
        // console.log(square.st === " ");
        // const newSquares = [];
        let currentSquare = { id: null, st: null };
        if (square.id === key) {
          // console.log(...squarea);

          currentSquare = { id: square.id, st: "x" };
          // newSquares.push(currentSquare);
        } else {
          currentSquare = { id: square.id, st: " " };
          // newSquares.push(currentSquare);
        }
        // console.log(currentSquare);
        setnextplay(true);
        return currentSquare;
      });
    } else if (nextplay === true) {
      square_clone = state["value"].map((square, index) => {
        if (square.id === key && square.st === " ") {
          const square1 = { ...square, st: "x" };
          if (turn === false) {
            const square1 = { ...square, st: "o" };
            setturn(true);
            return square1;
          }
          setturn(false);
          return square1;
        }
        return square;
      });
    }
    // console.log(nextplay);
    // console.log(square_clone);
    // console.log(square);
    dispatch({
      type: "changed_board",
      value: square_clone
    });
  }
  //  console.log(nextplay);
  let squareElements = [];
  if (square.length > 0 && nextplay === false) {
    squareElements = square.map((square) => (
      <Box id={square.id} toggle={toggle} />
    ));
  } else if (state["value"].length > 0 && nextplay === true) {
    // console.log("hi")
    squareElements = state["value"].map((square1) => (
      <Box id={square1.id} toggle={toggle} st={square1.st} />
    ));
  }
  //   function x() {
  //     dispatch({
  //       type: "changed_name",
  //       nextName: e.target.value,
  //     });
  //   }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={state.name} onChange={handleChange} />
        <div className="grid" style={cssProperties}>
          {squareElements}
        </div>
      </form>
    </div>
  );
}

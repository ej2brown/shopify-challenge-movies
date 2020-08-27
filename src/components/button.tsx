import React, { useState, useEffect } from "react";

export default function Button(props: any) {
  const [disable, setDisable] = useState(false)

  const setNominatee = () => {
    if (!disable) {
      props.onNominate(props.movie)
      setDisable(true)
    };
  };

  return (
    <button
      onClick={() => setNominatee()}
      disabled={disable}
    >
      {props.children}
    </button>
  );
}

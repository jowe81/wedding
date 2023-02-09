import { useState, useEffect } from "react";

export default function useForceUpdate() {

  //console.log('Trigger rerender');

  const [value, setValue] = useState(0);

  return () => setValue((value) => value + 1);
}

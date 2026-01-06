import { useEffect, useState } from "react";
import { Cart } from "./Cart";
import "./styles.css";
import { Items } from "./Types";
import { mockData } from "./Utility";

export default function App() {
  const [itemsList, setItemsList] = useState<Items[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    mockData().then((res) => {
      console.log(res);
      setItemsList(res);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {isLoading ? <p>loading the data....</p> : <Cart items={itemsList} />}
    </div>
  );
}

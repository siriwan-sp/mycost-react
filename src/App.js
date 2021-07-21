import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import "./App.css";
import { useState, useEffect } from "react";
import DataContext from "./context/DataContext";
import Report from "./components/Report";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const design = { color: "red", textAlign: "center", fontSize: "1.5rem" };

  const [items, setItems] = useState([]);

  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };

  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0);
    const expense = amounts
      .filter((element) => element < 0)
      .reduce((total, element) => (total -= element), 0);

    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [items, reportIncome, reportExpense]);

  return (
    <DataContext.Provider
      value={{
        income: reportIncome,
        expense: reportExpense,
      }}
    >
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>

        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">บันทึกข้อมูล</Link>
              </li>
              <li>
                <Link to="/report">ข้อมูลบัญชี</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/" exact>
                <FormComponent onAddItem={onAddNewItem} />
                <Transaction items={items} />
              </Route>
              <Route path="/report">
                <Report />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;

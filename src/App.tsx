import "./App.css";
import QuotePage from "./components/QuotePage";
import QuotesPage from "./components/QuotesPage";

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

const paths = [
  {
    path: "/random-quote",
    component: <QuotePage type="random" />,
    linkText: "Random Quote"
  },
  {
    path: "/quotes/:quoteId",
    component: <QuotePage type="single" />,
    linkText: ""
  },
  {
    path: "/",
    component: <QuotesPage type="all" />,
    linkText: "All Quotes"
  },
];

function App() {
  return (
    <BrowserRouter>
      <nav>
        {paths.map(({ path, linkText }) => (
          <Link
            key={path}
            style={{ marginRight: 10, textDecoration: "none" }}
            to={path}
          >
            {linkText}
          </Link>
        ))}
      </nav>

      <div className="app">
        <div className="container">
          <Routes>
            {paths.map((path) => (
              <Route key={path.path} element={path.component} {...path} />
            ))}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from "./components/navigation/navigation";
import CarparkDetails from "./components/carparkDetails/carparkDetails";
import CostCalculator from "./components/costCalculator/costCalculator";
import Register from "./components/register/register";

class Carparkly extends React.Component {
    render() {
        document.body.style.backgroundColor = "#313896";
        return (
            <Router>
                <div>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/costCalculator">
                            <CostCalculatorCard />
                        </Route>
                        <Route path="/carpark">
                            <CarparkCard />
                        </Route>
                        <Route path="/register">
                            <RegisterCard />
                        </Route>
                        <Route path="/">
                            <NavigationCard />
                        </Route>
                    </Switch>
                </div>
            </Router>

        );
    }
}

function NavigationCard() {
    return <Navigation />;
}

function CarparkCard() {
    return <CarparkDetails />;
}

function CostCalculatorCard() {
    return <CostCalculator />;
}

function RegisterCard(){
    return <Register/>
}

// ========================================

ReactDOM.render(
    <Carparkly />,
    document.getElementById('root')
);

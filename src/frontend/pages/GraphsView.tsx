import React, { useState } from 'react';
import ExpenseComponent from '../components/ExpenseComponent';
import GraphComponent from '../components/GraphComponent';

const GraphView: React.FC = () => {

    const [expenses, setExpenses] = useState<ExpenseBackendData[]>([]);

    return (
        <div>

            <ExpenseComponent expenses={expenses} setExpenses={setExpenses} />
            <GraphComponent expenses={expenses} />

        </div>
    );
};

export default GraphView;
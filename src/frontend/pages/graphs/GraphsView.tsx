import React, { useState } from 'react';
import ExpenseComponent from '../../components/expenses/ExpenseComponent';
import GraphComponent from '../../components/graphs/GraphComponent';
import CategorieComponent from '@/frontend/components/category/CategorieComponent';

const GraphView: React.FC = () => {

    const [expenses, setExpenses] = useState<ExpenseBackendData[]>([]);

    return (
        <div>

            <ExpenseComponent expenses={expenses} setExpenses={setExpenses} />
            <CategorieComponent />
            <GraphComponent expenses={expenses} />

        </div>
    );
};

export default GraphView;
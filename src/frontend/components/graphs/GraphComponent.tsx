import React from 'react';
import { Bar, Line } from '@/lib/ChartLib';
import CategoryGraph from './category/CategoryGraph';
import { useCategorySum } from '../hooks/useCategorySum';
interface graphComponentProps {
    expenses: ExpenseBackendData[]
} 

const GraphComponent: React.FC<graphComponentProps> = ({expenses}) => {

    const {
        categorySums,
        getSumOfCategories
    } = useCategorySum();

    return (
        <div>
            <div>
                <button onClick={getSumOfCategories}> Get all categoryData </button>
            <h2 >Revenue vs Loss</h2>
            <Bar 
                data={{
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                    label: 'expenses',
                    data: expenses.map((exp) => exp.SUM),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    },
                    {
                    label: 'Loss',
                    data: [100, 140, 130],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ],
                }}
            />
            </div>
                <CategoryGraph 
                    categorySums={categorySums}
                />
            //<div>
            <h2 >Revenue vs Loss</h2>
            <Line 
                data={{
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                    label: 'Revenue',
                    data: [200, 300, 400],
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    },
                    {
                    label: 'Loss',
                    data: [100, 140, 130],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ],
                }}
            />
            </div>
        </div>
    );
};

export default GraphComponent;
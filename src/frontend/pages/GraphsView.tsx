import React, { useState } from 'react';
import { Bar, Doughnut, Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register what you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const GraphView = () => {

    const [expenses, setExpenses] = useState<ExpenseBackendData[]>([]);

    const getData = async () => {
        try {
        const data: ExpenseBackendData[] = await window.electron.getAllBackendExpenseData();
        setExpenses(data);
        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    };

    return (
        <div>
            <button onClick={getData}>Load Expenses</button>
            <ul>
                {expenses.map((exp) => (
                <li key={exp.ID}>
                    {exp.EXPENSE_REASON || 'No reason'} — ${exp.SUM}
                </li>
                ))}
            </ul>

            <div>
            <h2 >Revenue vs Loss</h2>
            <Bar 
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
            <div>
            <h2 >Revenue vs Loss</h2>
            <Doughnut 
                data={{
                labels: expenses.map((exp) => exp.EXPENSE_REASON),
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
            <div>
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

export default GraphView;
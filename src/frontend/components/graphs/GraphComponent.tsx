import React from 'react';
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
interface graphComponentProps {
    expenses: ExpenseBackendData[]
} 

const GraphComponent: React.FC<graphComponentProps> = ({expenses}) => {


    return (
        <div>
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

export default GraphComponent;
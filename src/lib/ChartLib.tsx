// ChartLib.tsx
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
  Legend,
} from 'chart.js';

import { Doughnut, Bar, Line } from 'react-chartjs-2';

// Register chart components globally (only once)
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

// Export chart components for reuse
export { Doughnut, Bar, Line };

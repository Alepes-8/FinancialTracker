import React from 'react';
import { Doughnut } from '@/lib/ChartLib';

interface categoryGraphPop {
  categorySums: CategorySumData[]
}

const CategoryGraph: React.FC<categoryGraphPop> = ({
  categorySums
}) => {

  return(
            <div>
            <h2 >Revenue vs Loss</h2>
            <Doughnut 
                data={{
                labels: categorySums.map((cat) => cat.CATEGORY_NAME),
                datasets: [

                    {
                    label: 'Loss',
                    data: categorySums.map((cat) => cat.SUM),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ],
                }}
            />
            </div>
  );
}

export default CategoryGraph;

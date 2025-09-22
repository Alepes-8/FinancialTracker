import React from 'react';
import { Doughnut } from '@/lib/ChartLib';
import { getDifferentColorMap } from '@/frontend/utils/graphUtils'

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
                    backgroundColor: getDifferentColorMap(categorySums),
                    }
                ],
                }}
            />
            </div>
  );
}

export default CategoryGraph;

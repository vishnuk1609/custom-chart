import { FunctionComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
const colors = scaleOrdinal(schemeCategory10).range();

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 6000,
    pv: 9800,
    amt: 2290
  }
  // {
  //   name: 'Page D',
  //   uv: 2780,
  //   pv: 3908,
  //   amt: 2000
  // },
  // {
  //   name: 'Page E',
  //   uv: 1890,
  //   pv: 4800,
  //   amt: 2181
  // },
  // {
  //   name: 'Page F',
  //   uv: 2390,
  //   pv: 3800,
  //   amt: 2500
  // },
  // {
  //   name: 'Page G',
  //   uv: 3490,
  //   pv: 4300,
  //   amt: 2100
  // }
];

const getPath = (x: number, y: number, width: number, height: number) => {
  const triangleHeight = Math.min(height, y - 90);
  const triangleX = x;
  const triangleY = y;
  const barX = x;
  const barY = y;

  // Triangle path (equilateral triangle)
  const trianglePath = `
    M${triangleX - 25},
    ${triangleY + 100} L${triangleX + width / 2},
    ${triangleHeight + 90} L${triangleX + width + 25},
    ${triangleY + 100} Z
  `;

  // Bar (rectangle) path
  const barPath = `
    M${barX},
    ${barY + 90} L${barX + width},
    ${barY + 90} L${barX + width},
    ${barY + height - 35} L${barX},
    ${barY + height - 35} Z
  `;

  // circle path below the bar
  const circlePath = `
  M${barX - width / 2},
  ${y + height - 18} 
  A${width / 2}, ${width / 10} 0 0 1 ${barX + width + width / 2},
  ${y + height - 20} 
  A${width / 2}, ${width / 10} 0 0 1 ${barX - width + width / 2},
  ${y + height - 18} Z
`;

  return trianglePath + circlePath + barPath;
};

const TriangleBar: FunctionComponent<any> = (props: any) => {
  const { fill, x, y, width, height } = props;

  console.log(getPath(x, y, width, height));

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function App() {
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <BarChart
        width={800}
        height={600}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="uv"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: 'top' }}
          barSize={100}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

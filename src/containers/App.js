import MultilineTextFields from "../elements/myDropdown";
import CustomizedTables from "../elements/myTable";
import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2"
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
//this sets the display language. In the documentation it uses "de", which will display dates in German.
ChartJS.register(...registerables);
function custom_sort(a, b) {
  return new Date(a.month).getTime() - new Date(b.month).getTime();
}
function App() {
  

  const [data, setdata] = useState([]);
  const [activeType, setActiveType] = useState("All");
  const [chartData, setChartData] = useState([]);
 
  const fetchData = async () => {
    var datasetarr = []
    const res = await fetch('http://fetest.pangeatech.net/data');
    const data1 = await res.json();
    setdata(data1)
  }

  useEffect(() => {
   fetchData();
  }, [])

  useEffect(() => {
    if(!data) return;
    const result = data.reduce(function (r, a) {

      r[a.revenue_type.split('-')[1]] = r[a.revenue_type.split('-')[1]] || [];
      r[(a.revenue_type).split('-')[1]].push(a);
      return r;

  }, Object.create(null));

    const allObj=Object.keys(result).map(e =>{
      if(activeType=="All"){
        console.log("-->res",result[e])
        return {
          label: e,
          data: result[e].map(e => e.revenue),
          borderColor: `rgba(${Math.random()*256},${Math.random()*256},${Math.random()*256},1)`
        }
      }
    })
    //console.log("hfvhgvh--->","sdgsgsgs",result,"spec","acti",result[activeType]?.map(e => e.revenue))
    const specData = [{
      label: activeType,
      data: result[activeType]?.map(e => e.revenue),
      borderColor: `rgba(${Math.random()*256},${Math.random()*256},${Math.random()*256},1)`
    }]
    console.log(specData)

    setChartData(
      activeType==="All"?allObj:specData
    )
   }, [activeType, data])
  return (
    <div className="">
    <div className="flex items-center justify-between w-full bg-gray-100 p-4">
      <MultilineTextFields setActiveType={setActiveType} revenuetype={["All", ...new Set(data.map(e=>e.revenue_type.split('-')[1]))].map(e2=>{
        return {
          value:e2,
          label:e2
        }
      })}/>
      <p>Hi John Doe</p>
    </div>
    <div className="mx-auto max-w-[1280px]">
    <Line data={{labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],datasets:chartData}} options={{
            title:{
              display:true,
              text:'',
              fontSize:10
            },
            scales:{
              y:{
                min:0,
                max:5000
              }
            },
            legend:{
              display:true,
              position:'right'
            }
          }} />
    <CustomizedTables data={data} activeType={activeType}/>
    </div>
    </div>
  );
}

export default App;

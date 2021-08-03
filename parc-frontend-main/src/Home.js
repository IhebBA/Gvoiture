import React, { useEffect, useReducer, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';
import PrintIcon from '@material-ui/icons/Print';
import ReactExport from 'react-data-export';





function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const date = new Date();

function aggregateByCarMat(missions = []) {
  const initialState = {};

  const reducer = (aggregatedArr, currentValue) => {
    const car_mat = currentValue["car_mat"];
    return {
      ...aggregatedArr,
      [car_mat]: {
        car_mat,
        carburant:
          currentValue.carburant + (aggregatedArr?.[car_mat]?.carburant || 0),
        distance:
          currentValue.distance + (aggregatedArr?.[car_mat]?.distance || 0),
      },
    };
  };

  return missions.reduce(reducer, initialState);
}


var sommeC = 0 ; 
var sommeD =0 ;
function Home() {
  const [{ startDate, endDate }, dispatch] = useReducer(reducer, {
    startDate: new Date(date.getFullYear(), date.getMonth(), 2)
      .toISOString()
      .slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  });
  const [chartData, setChartData] = useState();
  const [entretiens, setEntretiens] = useState([]);

  const handleChange = (event) => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const [missionsResp, entretiensResp] = await Promise.all([
        fetch(`/missions/get?startDate=${startDate}&endDate=${endDate}`),
        fetch(`/maintenances/get?startDate=${startDate}&endDate=${endDate}`),
      ]);
      const missions = await missionsResp.json();
      const entretiens = await entretiensResp.json();
      setEntretiens(entretiens);

      /*missions.map((obj,index)=>{
        sommeC = sommeC+ obj.carburant
        sommeD = sommeD+obj.distance
      })
      console.log(sommeC);
      console.log(sommeD);*/
      //console.log(missions);
      const missionsByCarMat = aggregateByCarMat(missions);
      console.log(missionsByCarMat)
      if (!ignore) setChartData(Object.values(missionsByCarMat));
      
      //console.log(chartData);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [startDate, endDate]);

  const sortedEntretiens = entretiens.sort((a, b) =>
    a.car_mat > b.car_mat ? 1 : a.car_mat < b.car_mat ? -1 : 0
  );

  const mats = [
    { mat: "546", date: "12-02-2020", montant: "30", total: "80" },
    { date: "10-12-2015", montant: "50" },
    { mat: "390", date: "10-01-2021", montant: "39", total: "39" },
  ];


  // imprimer 
  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

// exel 

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DataSet = [
  {
    columns : [
        {title:"Voiture",style:{font:{sz:"18",bold:true}},width:{wpx:125}},
        {title:"Date",style:{font:{sz:"18",bold:true}},width:{wpx:125}},
        {title:"description",style:{font:{sz:"18",bold:true}},width:{wch:125}},
        {title:"Montant",style:{font:{sz:"18",bold:true}},width:{wpx:125}},
        {title:"Total",style:{font:{sz:"18",bold:true}},width:{wpx:125}},
    ],
    data : sortedEntretiens.map((data)=>[
      {value : data.car_mat,style:{font:{sz:"14"}}},
      {value : data.date,style:{font:{sz:"14"}}},
      {value : data.description,style:{font:{sz:"14"}}},
      {value : data.montant,style:{font:{sz:"14"}}},
    ])
  }
]
 

  return (

   
    <div>
      <PDFExport ref={pdfExportComponent} >
      <div style={{margin:'0 20px '}}>
        <button primary={true} onClick={handleExportWithComponent}><PrintIcon ></PrintIcon>imprimer</button> 
        &nbsp;  &nbsp;
        {sortedEntretiens.length !== 0 ? (
          <ExcelFile 
          fileName = "rapport exel"
          element={<button type="button" style={{color:'green '}}>export data to excel</button>}>
            <ExcelSheet dataSet={DataSet} name="rapport exel"/>
          </ExcelFile>
        ): null}
      </div>
      
      <p className="text-center mt-4">
        Suivi Kilometrage, Consommation et Entretien entre &nbsp;
        <input
          name="startDate"
          type="date"
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={startDate}
          onChange={handleChange}
        />
        &nbsp; et &nbsp;
        <input
          name="endDate"
          type="date"
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={endDate}
          onChange={handleChange}
        />
      </p>
      
              
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        style={{ margin: "20px auto" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="car_mat" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="distance"
          fill="#2980b9"
          name="Kilometrage"
          label={{ position: "top" }}
        />
        <Bar
          dataKey="carburant"
          fill="#f1c40f"
          name="Carburant"
          label={{ position: "top" }}
        />
      </BarChart>
      
      <hr />
     
      <table className="table-auto m-auto mt-3">
        <caption>Entretiens effectués ce mois:</caption>
        <thead>
          <tr>
            <th className="px-4 py-2">Voiture</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">description</th>
            {/* <th className="px-4 py-2">Description</th> */}
            <th className="px-4 py-2">Montant</th>
            {/* <th className="px-4 py-2">Total</th> */}
          </tr>
        </thead>
        <tbody>
          {sortedEntretiens.map(
            ({ id, car_mat, description, montant, date }) => (
              <tr key={id}>
                <td className="border px-4 py-2">{car_mat}</td>
                <td className="border px-4 py-2">
                  {format(new Date(date), "dd/MM/yyyy")}
                </td>
                <td className="border px-4 py-2">{description}</td>
                <td className="border px-4 py-2">{montant}</td>
                {/* <td className="border px-4 py-2" rowSpan="2">
                  100
                </td> */}
              </tr>
            )
          )}
          {/* <tr>
            <td className="px-4 py-2 border" rowspan="2">
              Voiture 1
            </td>
            <td className="px-4 py-2 border">12.01.2021</td>
            <td className="px-4 py-2 border">30</td>
            <td className="px-4 py-2 border" rowspan="2">
              100
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">04.05.2009</td>
            <td className="px-4 py-2 border">70</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Voiture 2</td>
            <td className="px-4 py-2 border">12.10.2050</td>
            <td className="px-4 py-2 border">50</td>
            <td className="px-4 py-2 border">50</td>
          </tr> */}
        </tbody>
      </table>
      </PDFExport>
    </div>
  );
}

export default Home ;

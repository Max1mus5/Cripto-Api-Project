import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip } from 'recharts';
import "./css_components/chart.css"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
      const { date, price } = payload[0].payload;
      return (
          <div className="custom-tooltip">
              <p className="tooltip-date">{date}</p>
              <p className="tooltip-price">${price.toFixed(2)}</p>
          </div>
      );
  }
  return null;
};

// Componente GraphCoin
const GraphCoin = ({ coinID }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await fetch(`http://localhost:8001/coins/chart/${coinID}/`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                // Transformar datos para el gráfico
                const transformedData = data.map(item => ({
                    date: item.date,
                    price: item.price
                }));

                setChartData(transformedData);
            } catch (error) {
                console.error('Error fetching chart data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [coinID]);

    if (loading) return <p>Cargando gráfico...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='coinGraphContainer'>
            <h2>Precio 7 Dias</h2>
            <AreaChart
                width={600}
                height={300}
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(tick) => tick.slice(0, 10)} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
            </AreaChart>
        </div>
    );
};

export default GraphCoin;

import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { motion } from 'framer-motion';


const Linechart = () => {
  const data = [
    { month: 'Jan', orders: 100, sales: 2000 },
    { month: 'Feb', orders: 120, sales: 1800 },
    { month: 'Mar', orders: 90, sales: 2100 },
    { month: 'Apr', orders: 150, sales: 2500 },
    { month: 'May', orders: 180, sales: 2200 },
    { month: 'Jun', orders: 200, sales: 2600 },
    { month: 'Jul', orders: 220, sales: 2400 },
    { month: 'Aug', orders: 170, sales: 2800 },
    { month: 'Sep', orders: 190, sales: 2300 },
  ];

  const pieChartData = [
    { name: 'Product A', value: 30 },
    { name: 'Product B', value: 25 },
    { name: 'Product C', value: 20 },
    // ... (data for other products)
  ];

  const pieChartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'];

  return (
    <Grid container spacing={2} sx={{ padding:15 }}>
      <Grid item xs={12} md={6}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Paper sx={{ p: 2 }}>
          {/* Line Chart */}
          <Typography variant="h5" sx={{ mb: 2 }}>
          Weekly Sales
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orders" name="Orders" stroke="#8884d8" />
        <Line type="monotone" dataKey="sales" name="Sales" stroke="#82ca9d" />
        </LineChart>
          </ResponsiveContainer>
        </Paper>
        </motion.div>
      </Grid>
      <Grid item xs={12} md={6}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Paper sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
           Best Selling Products
          </Typography>
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {pieChartData[index].name}
                </text>
              );
            }}
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
            ))}
           </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default Linechart;

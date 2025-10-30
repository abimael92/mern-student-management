import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from 'recharts';

const StatsCard = ({
  title,
  count,
  trendData,
  change,
  avatars = [],
  color,
}) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <Card
      sx={{
        p: 3,
        textAlign: 'center',
        minWidth: 250,
        background:
          color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: 4,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
          {count}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'inline-block',
            px: 1,
            borderRadius: 2,
            fontWeight: 'bold',
          }}
        >
          {change > 0 ? `▲ ${change}%` : `▼ ${Math.abs(change)}%`}
        </Typography>
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={trendData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 8,
                border: 'none',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ffffff"
              fill="url(#colorValue)"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={3}
              dot={{ fill: '#ffffff', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        {avatars.length > 0 && (
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            {avatars.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar
                  src={src}
                  sx={{
                    width: 32,
                    height: 32,
                    mx: 0.5,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                  }}
                />
              </motion.div>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default StatsCard;

// ===== ./frontend/src/pages/Library/LibraryPage.tsx =====
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../../utils/api';
import TextbookCard from '../../components/facilities/library/TextbookCard';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search, FilterList, Download, Add } from '@mui/icons-material';

const LibraryPage = () => {
  const theme = useTheme();
  const [textbooks, setTextbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Fetch textbooks
  useEffect(() => {
    api
      .fetchTextbooks()
      .then((res) => setTextbooks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filtered textbooks based on search input
  const filteredBooks = useMemo(() => {
    return textbooks.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [textbooks, search]);

  return (
    <Container sx={{ py: 4, minHeight: '100vh' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            mb: 4,
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Textbook Library
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Explore all available textbooks and manage your collection
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Search textbooks"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />,
              }}
            />

            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Filters
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              Add Textbook
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Empty State */}
      {!loading && filteredBooks.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No textbooks found.
          </Typography>
        </Box>
      )}

      {/* Textbooks Grid */}
      <Grid container spacing={4}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextbookCard book={book} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LibraryPage;

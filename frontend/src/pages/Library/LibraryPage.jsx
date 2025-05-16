import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import TextbookCard from '../../components/library/TextbookCard';
import { Container, Grid, Typography } from '@mui/material';

const LibraryPage = () => {
  const [textbooks, setTextbooks] = useState([]);

  useEffect(() => {
    api
      .fetchTextbooks()
      .then((res) => setTextbooks(res.data))
      .catch(console.error);
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Open Textbook Library
      </Typography>
      <Grid container spacing={4}>
        {textbooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <TextbookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LibraryPage;

import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from '@mui/material';

const TextbookCard = ({ book }) => {
  const [expanded, setExpanded] = useState(false);
  const imgRef = useRef();
  const [showCover, setShowCover] = useState(true);

  const contributorNames =
    book.contributors?.map((c) =>
      [c.first_name, c.middle_name, c.last_name].filter(Boolean).join(' ')
    ) || [];

  const isbn = book.ISBN13 || book.ISBN10 || null;
  const coverUrl = isbn
    ? `https://covers.openlibrary.org/b/ISBN/${isbn}-L.jpg`
    : '/default_cover.jpg';

  const handleImageLoad = (e) => {
    if (e.target.naturalWidth < 100 || e.target.naturalHeight < 150) {
      setShowCover(false);
    }
  };

  const handleImageError = () => setShowCover(false);

  return (
    <Box
      sx={{
        maxWidth: 300,
        margin: '0 auto',
        perspective: 1000,
        cursor: 'pointer',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 400,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s',
          transform: expanded ? 'rotateY(180deg)' : 'none',
        }}
      >
        {/* Front */}
        <Card
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 2,
            zIndex: 1,
          }}
        >
          {showCover ? (
            <CardMedia
              ref={imgRef}
              component="img"
              image={coverUrl}
              alt={`${book.title} cover`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sx={{ height: 200, objectFit: 'cover', borderRadius: 1 }}
            />
          ) : (
            <Box
              sx={{
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.300',
                borderRadius: 1,
              }}
            >
              <Typography>No Cover</Typography>
            </Box>
          )}

          <CardContent>
            <Typography variant="h6" gutterBottom>
              {book.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <strong>Author:</strong>{' '}
              {contributorNames.length
                ? contributorNames.join(', ')
                : 'Unknown'}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <strong>Year:</strong> {book.copyright_year || 'N/A'}
            </Typography>

            <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
              {book.formats?.length ? (
                book.formats.map((format) => (
                  <Chip
                    key={format.id}
                    label={format.format}
                    component="a"
                    href={format.url}
                    target="_blank"
                    clickable
                    onClick={(e) => e.stopPropagation()}
                    color="primary"
                    size="small"
                  />
                ))
              ) : (
                <Typography variant="caption" color="text.secondary">
                  No formats available
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Back */}
        <Card
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            overflow: 'auto',
            padding: 2,
            boxSizing: 'border-box',
            zIndex: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="h6" gutterBottom>
            {book.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              whiteSpace: 'pre-wrap',
              maxHeight: 100,
              overflowY: 'auto',
            }}
          >
            {book.description || 'No description available.'}
          </Typography>

          <Typography variant="caption">
            <strong>ISBN-10:</strong> {book.ISBN10 || 'N/A'}
          </Typography>
          <br />
          <Typography variant="caption">
            <strong>ISBN-13:</strong> {book.ISBN13 || 'N/A'}
          </Typography>
          <br />
          <Typography variant="caption">
            <strong>Language:</strong> {book.language || 'N/A'}
          </Typography>
          <br />
          <Typography variant="caption">
            <strong>License:</strong> {book.license || 'N/A'}
          </Typography>
          <br />
          <Typography variant="caption">
            <strong>Publisher(s):</strong>{' '}
            {book.publishers?.map((p) => p.name).join(', ') || 'Unknown'}
          </Typography>
          <br />
          <Typography variant="caption">
            <strong>Rating:</strong> {book.rating || 'N/A'}
          </Typography>
          <br />
          <Typography variant="caption">
            <strong>Reviews:</strong> {book.textbook_reviews_count ?? '0'}
          </Typography>

          <Box mt={2}>
            <Button
              variant="contained"
              href={book.url}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              View Book Details
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default TextbookCard;

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Typography, Box, Chip, Button } from '@mui/material';
import api from '../utils/axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => {
      setProduct({
        id: res.data.id,
        title: res.data.title,
        description: res.data.body,
        price: Math.floor(Math.random() * 500) + 20,
        category: ['Electronics', 'Clothing', 'Books', 'Home'][res.data.id % 4],
        image: `https://picsum.photos/500/300?random=${res.data.id}`,
      });
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 12, marginBottom: 24 }}
        />
        <Typography variant="h4" gutterBottom>{product.title}</Typography>
        <Chip label={product.category} sx={{ mb: 2 }} />
        <Typography variant="body1" paragraph>{product.description}</Typography>
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>${product.price}</Typography>
        <Button variant="contained">Add to Cart</Button>
      </Box>
    </Container>
  );
};

export default ProductDetails;

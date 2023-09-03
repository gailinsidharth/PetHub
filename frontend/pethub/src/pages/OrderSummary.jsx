import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const OrderSummary = ({ cartItems, removeFromCart }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Order Summary</Typography>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item._id}>
              <ListItemAvatar>
                <Avatar alt={item.product.title} src={item.product.image} />
              </ListItemAvatar>
              <ListItemText
                primary={item.product.title}
                secondary={`Quantity: ${item.quantity} - Price: $${parseFloat(item.product.productPrice.replace(',', ''))} - Total: $${(parseFloat(item.product.productPrice.replace(',', '')) * item.quantity).toFixed(2)}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" color="secondary" onClick={() => removeFromCart(item.product._id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

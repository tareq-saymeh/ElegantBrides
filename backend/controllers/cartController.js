const Cart = require('../models/Cart');
const Item = require('../models/Items');
const Reservations = require('../models/Reservations');

// Get cart items
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user }).populate({
      path: 'items.itemId',
      select: 'name price image type' // specify fields you need
    });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const confirmCart = async (req, res) => {
  try {
    // Find the cart for the logged-in user
    const cart = await Cart.findOne({ userId: req.user });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if the cart has items
    if (cart.items.length === 0) {
      return res.status(400).json({
        message: 'Cannot confirm an empty cart.',
      });
    }

    // Iterate through the items in the cart
    for (const cartItem of cart.items) {
      if (cartItem.receivedDate && cartItem.returnDate) {
        // Check for overlapping reservations
        const overlappingReservations = await Reservations.find({
          'items.itemId': cartItem.itemId,
          $or: [
            {
              $and: [
                { 'items.receivedDate': { $lte: cartItem.returnDate } },
                { 'items.returnDate': { $gte: cartItem.receivedDate } },
              ],
            },
          ],
        });

        if (overlappingReservations.length > 0) {
          return res.status(400).json({
            message: `Item with ID ${cartItem.itemId} is already reserved during the selected dates.`,
          });
        }
      }
    }

    // If no conflicts were found and the cart is not empty, set the confirm field to true
    cart.confirm = true;

    // Save the updated cart
    await cart.save();

    // Optionally, delete the cart after confirmation
    await Cart.findByIdAndDelete(cart._id);

    // Send a success response
    res.status(200).json({ message: 'Cart confirmed successfully' });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error confirming cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Add item to cart
const addItemToCart = async (req, res) => {
  
  const  items  = req.body;
   // `items` should include `itemId`, `quantity`, and other details
  try {
    const itemDetails = await Item.findById(items.itemId);
    
    // Ensure item exists
    if (!itemDetails) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    // Check if the item is RentAble and adjust quantity accordingly
    if (itemDetails.RentAble && items.receivedDate && items.returnDate) {
      const rentDuration = Math.ceil((new Date(items.returnDate) - new Date(items.receivedDate)) / (1000 * 60 * 60 * 24));
      console.log(rentDuration);
      
      items.quantity = rentDuration; // quantity in cart corresponds to the number of days rented
    } else if (itemDetails.BuyAble) {
      if(!items.quantity){
        items.quantity=1
      }
      // For purchases, ensure requested quantity is available
      if (items.quantity > itemDetails.quantity) {
        return res.status(400).json({ message: 'Not enough items in stock for purchase.' });
      }
    } else {
      return res.status(400).json({ message: 'Item is neither rentable nor buyable.' });
    }

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ userId: req.user });
    
    if (!cart) {
      cart = new Cart({ userId: req.user, items: [items] });

    } else {
      cart.items.push(items);
    }

    // Adjust the item quantity in stock
    if (itemDetails.BuyAble) {
    itemDetails.quantity -= items.quantity;
  }

    await itemDetails.save();

    // Save the cart and respond with a success message
    await cart.save();
    res.status(200).json({ message: 'Item added to cart successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const removeItemFromCart = async (req, res) => {
  const { itemId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: req.user });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart and remove it
    const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  confirmCart
};

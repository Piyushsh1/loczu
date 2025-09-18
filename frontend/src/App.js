import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";

// Components
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage";
import BusinessDetailPage from "./pages/BusinessDetailPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AuthModal from "./components/Auth/AuthModal";

// Mock Data
import { mockUser, mockCart, mockWishlist } from "./data/mock";

function App() {
  // State Management
  const [user, setUser] = useState(mockUser);
  const [cartItems, setCartItems] = useState(mockCart);
  const [wishlistItems, setWishlistItems] = useState(mockWishlist);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { toast } = useToast();

  // Load data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('serviceHub_user');
    const savedCart = localStorage.getItem('serviceHub_cart');
    const savedWishlist = localStorage.getItem('serviceHub_wishlist');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('serviceHub_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('serviceHub_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('serviceHub_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Authentication handlers
  const handleLogin = (userData) => {
    setUser({ ...userData, isLoggedIn: true });
    toast({
      title: "Welcome back!",
      description: `Good to see you again, ${userData.name}!`,
    });
  };

  const handleRegister = (userData) => {
    setUser({ ...userData, isLoggedIn: true });
    toast({
      title: "Welcome to ServiceHub!",
      description: "Your account has been created successfully.",
    });
  };

  const handleLogout = () => {
    setUser({ ...mockUser, isLoggedIn: false });
    setCartItems([]);
    setWishlistItems([]);
    localStorage.removeItem('serviceHub_user');
    localStorage.removeItem('serviceHub_cart');
    localStorage.removeItem('serviceHub_wishlist');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAuthClick = () => {
    if (user.isLoggedIn) {
      handleLogout();
    } else {
      setShowAuthModal(true);
    }
  };

  // Cart handlers
  const handleAddToCart = (item) => {
    if (!user.isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      const newItem = {
        ...item,
        quantity: 1,
        businessId: item.businessId || 'unknown',
        businessName: item.businessName || 'Unknown Business'
      };
      setCartItems([...cartItems, newItem]);
    }

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleUpdateCartQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveFromCart = (itemId) => {
    const removedItem = cartItems.find(item => item.id === itemId);
    setCartItems(cartItems.filter(item => item.id !== itemId));
    
    toast({
      title: "Removed from cart",
      description: `${removedItem?.name} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  // Wishlist handlers
  const handleAddToWishlist = (business) => {
    if (!user.isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    const isInWishlist = wishlistItems.some(item => item.id === business.id);
    
    if (isInWishlist) {
      setWishlistItems(wishlistItems.filter(item => item.id !== business.id));
      toast({
        title: "Removed from wishlist",
        description: `${business.name} has been removed from your wishlist.`,
      });
    } else {
      setWishlistItems([...wishlistItems, business]);
      toast({
        title: "Added to wishlist",
        description: `${business.name} has been added to your wishlist.`,
      });
    }
  };

  // Navigation handlers
  const handleBusinessClick = (businessId) => {
    window.location.href = `/business/${businessId}`;
  };

  const handleCartClick = () => {
    window.location.href = '/cart';
  };

  const handleWishlistClick = () => {
    if (!user.isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    window.location.href = '/wishlist';
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          user={user}
          cartCount={cartItems.length}
          wishlistCount={wishlistItems.length}
          onAuthClick={handleAuthClick}
          onCartClick={handleCartClick}
          onWishlistClick={handleWishlistClick}
        />
        
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onBusinessClick={handleBusinessClick}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
                wishlistItems={wishlistItems}
              />
            }
          />
          <Route
            path="/business/:id"
            element={
              <BusinessDetailPage
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                wishlistItems={wishlistItems}
                cartItems={cartItems}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={handleClearCart}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlistItems={wishlistItems}
                onRemoveFromWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onBusinessClick={handleBusinessClick}
                cartItems={cartItems}
              />
            }
          />
        </Routes>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />

        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;

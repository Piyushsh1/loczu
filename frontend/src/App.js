import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import apolloClient from "./lib/apollo";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";

// Components
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage";
import BusinessDetailPage from "./pages/BusinessDetailPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AuthModal from "./components/Auth/AuthModal";

// Mock Data
import { mockUser, mockCart, mockWishlist } from "./data/mock";

function AppContent() {
  // State Management
  const [cartItems, setCartItems] = useState(mockCart);
  const [wishlistItems, setWishlistItems] = useState(mockWishlist);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuthContext();

  // Load data from localStorage on app start
  useEffect(() => {
    const savedCart = localStorage.getItem('loczu_cart');
    const savedWishlist = localStorage.getItem('loczu_wishlist');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('loczu_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('loczu_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Authentication handlers
  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      setCartItems([]);
      setWishlistItems([]);
      localStorage.removeItem('loczu_cart');
      localStorage.removeItem('loczu_wishlist');
    } else {
      setShowAuthModal(true);
    }
  };

  // Cart handlers
  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
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
    if (!isAuthenticated) {
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
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    window.location.href = '/wishlist';
  };

  // Adapt user object for Header component
  const headerUser = user ? {
    ...user,
    isLoggedIn: isAuthenticated,
    name: user.fullName || user.name
  } : { isLoggedIn: false };

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          user={headerUser}
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
          <Route
            path="/seller-dashboard"
            element={<SellerDashboard />}
          />
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />
        </Routes>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />

        <Toaster />
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;


import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Auth services
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error);
    toast({
      title: "Login failed",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  toast({
    title: "Login successful",
    description: `Welcome back!`,
  });

  return data;
};

export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error('Registration error:', error);
    toast({
      title: "Registration failed",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  toast({
    title: "Registration successful",
    description: "Please check your email to verify your account",
  });

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Logout error:', error);
    toast({
      title: "Logout failed",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  toast({
    title: "Logged out",
    description: "You have been successfully logged out",
  });
};

// Profile services
export const getUserProfile = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile:', error);
    throw error;
  }

  return data;
};

export const updateUserProfile = async (updates: { full_name?: string; phone?: string }) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', (await supabase.auth.getUser()).data.user?.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    toast({
      title: "Error",
      description: "Failed to update profile",
      variant: "destructive",
    });
    throw error;
  }

  toast({
    title: "Success",
    description: "Profile updated successfully",
  });

  return data;
};

// Product services
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data;
};

export const getProductsByCategory = async (categoryId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }

  return data;
};

export const getProductById = async (productId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq('id', productId)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    throw error;
  }

  return data;
};

// Category services
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return data;
};

// Order services
export const getUserOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          image_urls
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  return data;
};

export const createOrder = async (orderData: {
  payment_method: 'card' | 'cod' | 'upi';
  subtotal: number;
  shipping_cost: number;
  total: number;
  shipping_address: any;
  items: Array<{
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    total: number;
  }>;
}) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  // Generate order number
  const orderNumber = `KLK${Date.now()}${Math.floor(Math.random() * 1000)}`;

  // Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.user.id,
      order_number: orderNumber,
      payment_method: orderData.payment_method,
      subtotal: orderData.subtotal,
      shipping_cost: orderData.shipping_cost,
      total: orderData.total,
      shipping_address: orderData.shipping_address,
    })
    .select()
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    throw orderError;
  }

  // Create order items
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    product_price: item.product_price,
    quantity: item.quantity,
    total: item.total,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    throw itemsError;
  }

  toast({
    title: "Order placed successfully",
    description: `Order #${orderNumber} has been created`,
  });

  return { ...order, order_items: orderItems };
};

// Address services
export const getUserAddresses = async () => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .order('is_default', { ascending: false });

  if (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }

  return data;
};

export const createAddress = async (addressData: {
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  is_default?: boolean;
}) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('addresses')
    .insert({
      user_id: user.user.id,
      ...addressData,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating address:', error);
    toast({
      title: "Error",
      description: "Failed to create address",
      variant: "destructive",
    });
    throw error;
  }

  toast({
    title: "Success",
    description: "Address created successfully",
  });

  return data;
};

// Wishlist services
export const getUserWishlist = async () => {
  const { data, error } = await supabase
    .from('wishlist')
    .select(`
      *,
      products (
        *,
        categories (
          id,
          name
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }

  return data;
};

export const addToWishlist = async (productId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('wishlist')
    .insert({
      user_id: user.user.id,
      product_id: productId,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding to wishlist:', error);
    toast({
      title: "Error",
      description: "Failed to add to wishlist",
      variant: "destructive",
    });
    throw error;
  }

  toast({
    title: "Added to wishlist",
    description: "Product added to your wishlist",
  });

  return data;
};

export const removeFromWishlist = async (productId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', user.user.id)
    .eq('product_id', productId);

  if (error) {
    console.error('Error removing from wishlist:', error);
    toast({
      title: "Error",
      description: "Failed to remove from wishlist",
      variant: "destructive",
    });
    throw error;
  }

  toast({
    title: "Removed from wishlist",
    description: "Product removed from your wishlist",
  });
};

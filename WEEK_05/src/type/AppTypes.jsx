const Product = {
    id: 0,
    name: "",
    price: 0,
    count: 0,
    image: "",
    category: ""
  };
  
  const UserDetail = {
    id: 0,
    name: "",
    password: "",
    contact: 0,
    email: "",
    dob: "",
    gender: "",
    location: "",
    isAdmin: false
  };
  
  const ItemActionType = {
    type: "",
    payload: Product,
    selectedCategory: "",
    searchValue: ""
  };
  
  const State = {
    productItems: [],
    cartItems: [],
    category: "",
    search: "",
    productState: {}
  };
  
  const CartContextType = {
    state: State,
    dispatch: () => {}
  };
  
  const AuthContextType = {
    isAuthenticated: false,
    isAdmin: false,
    userId: 0,
    setUserId: () => {},
    setIsAuthenticated: () => {},
    setIsAdmin: () => {}
  };
  
  export { Product, UserDetail, ItemActionType, State, CartContextType, AuthContextType };
  
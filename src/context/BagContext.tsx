import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

export interface BagItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  imageIndex: number;
}

interface BagState {
  items: BagItem[];
  isOpen: boolean;
}

type BagAction =
  | { type: 'ADD_ITEM'; payload: BagItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'TOGGLE_BAG' }
  | { type: 'OPEN_BAG' }
  | { type: 'CLOSE_BAG' }
  | { type: 'CLEAR_BAG' }
  | { type: 'LOAD_STATE'; payload: BagState };

const initialState: BagState = {
  items: [],
  isOpen: false,
};

function bagReducer(state: BagState, action: BagAction): BagState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.product.id === action.payload.productId &&
              item.size === action.payload.size &&
              item.color === action.payload.color)
        ),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(item.product.id === action.payload.productId &&
                item.size === action.payload.size &&
                item.color === action.payload.color)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'TOGGLE_BAG':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_BAG':
      return { ...state, isOpen: true };
    case 'CLOSE_BAG':
      return { ...state, isOpen: false };
    case 'CLEAR_BAG':
      return { ...state, items: [] };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

interface BagContextType {
  state: BagState;
  dispatch: React.Dispatch<BagAction>;
  addItem: (item: BagItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  toggleBag: () => void;
  openBag: () => void;
  closeBag: () => void;
  clearBag: () => void;
  subtotal: number;
  itemCount: number;
}

const BagContext = createContext<BagContextType | null>(null);

export function BagProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bagReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('atelier-noir-bag');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: { ...parsed, isOpen: false } });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    try {
      const toSave = { items: state.items, isOpen: false };
      localStorage.setItem('atelier-noir-bag', JSON.stringify(toSave));
    } catch {
      // Ignore storage errors
    }
  }, [state.items]);

  const addItem = (item: BagItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (productId: string, size: string, color: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size, color } });
  const updateQuantity = (productId: string, size: string, color: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, color, quantity } });
  const toggleBag = () => dispatch({ type: 'TOGGLE_BAG' });
  const openBag = () => dispatch({ type: 'OPEN_BAG' });
  const closeBag = () => dispatch({ type: 'CLOSE_BAG' });
  const clearBag = () => dispatch({ type: 'CLEAR_BAG' });

  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BagContext.Provider value={{ state, dispatch, addItem, removeItem, updateQuantity, toggleBag, openBag, closeBag, clearBag, subtotal, itemCount }}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);
  if (!context) throw new Error('useBag must be used within BagProvider');
  return context;
}

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

// Use this custom hook instead of plain `useDispatch` for better TypeScript inference
export const useAppDispatch = () => useDispatch<AppDispatch>();
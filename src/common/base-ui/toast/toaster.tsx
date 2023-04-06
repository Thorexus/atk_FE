import React from 'react';
import { toast } from 'react-toastify';
import BaseToast from './bast-toast';

export const toaster = (
  variant: 'error' | 'success',
  title: string,
  description?: string,
) => {
  toast(
    <BaseToast variant={variant} title={title} description={description} />,
  );
};

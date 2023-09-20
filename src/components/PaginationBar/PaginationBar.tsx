import { Pagination, Stack } from '@mui/material';
import { setCurrentPage } from 'store/slices/charactersSlice.ts';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { FC } from 'react';
import '../../variables.scss'

export const PaginationBar: FC = () => {

  const { currentPage, pageQuantity } = useAppSelector(state => state.characters);

  const dispatch = useAppDispatch()

  return (
    <Stack spacing={2}>
      {!!pageQuantity && <Pagination
        count={pageQuantity}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        size="large"
        onChange={(_, numPage) => {
          dispatch(setCurrentPage(numPage));
        }}
        sx={{
          '.css-wjh20t-MuiPagination-ul': {
            display: 'flex',
            justifyContent: 'center',
          },
          '.css-kvsszq-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
            background: 'var(--silver-color)',
            color: 'var(--footer-color)',
            '&:hover': {
              background: 'var(--light-grey-color)',
            },
          },
          '.css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-disabled': {
            background: 'var(--light-grey-color)',
            color: 'rgba(39, 43, 51, 0.6)'
          },
          '.MuiPaginationItem-page': {
            background: 'var(--dark-gray-color)',
            color: 'var(--silver-color)',
            fontSize: 16
          },
          '.MuiPaginationItem-previousNext ': {
            background: 'var(--silver-color)',
            color: 'var(--main-color)',
            '&:hover': {
              background: 'var(--light-grey-color)',
            },
          },
          '.css-1scal0h-MuiPaginationItem-root': {
            color: 'var(--silver-color)',
          },
        }}
      />}
    </Stack>
  );
};



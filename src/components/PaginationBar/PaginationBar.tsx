import { Pagination, Stack } from '@mui/material';
import { setCurrentPage } from 'store/slices/charactersSlice.ts';
import { useAppDispatch } from 'components/hooks/redux-hooks.ts';
import { FC } from 'react';
import '../../variables.scss'


interface IPaginationBarProps {
    currentPage: number
}

export const PaginationBar: FC<IPaginationBarProps> = ({ currentPage }) => {

  const dispatch = useAppDispatch()
  return (
    <Stack spacing={2}>
      <Pagination
        count={6}
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
        }}
      />
    </Stack>
  );
};



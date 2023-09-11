import Pagination from '@mui/material/Pagination';
import { Card, CardContent, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IAllCharacters } from 'types/ICharacters.types.ts';

export default function PaginationRounded() {

  const [person, setPerson] = useState([])
  const [page, setPage] = useState(2)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    axios.get<IAllCharacters>(`https://rickandmortyapi.com/api/character/?page=${page}`).then(
      ({ data }) => {
        console.log(data)
        setPerson(data.results)
        setQuantity(data.info.count)
      })
  }, [page])

  return (
    <Grid container spacing={2}>
      {person.slice(0, 6).map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <Card>
            <CardContent>
              <p>{card.name}</p>
              <img src={card.image} alt={`${card.name} image`}/>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Pagination
            count={quantity}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={(_, numPage) => {
              setPage(numPage);
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}
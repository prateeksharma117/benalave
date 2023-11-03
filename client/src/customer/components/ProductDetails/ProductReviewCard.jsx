import { Avatar, Box, Grid, Rating } from '@mui/material'

const ProductReviewCard = () => {
  return (
    <>
    <Grid container spacing={2} gap={3}>
        <Grid item sx={1}>
            <Box>
                <Avatar className=' text-white' sx={{width:56,height:56,bgcolor:"#9155fd"}}></Avatar>
            </Box>
        </Grid>

        <Grid item sx={9}>
            <div className=' space-y-2'>
                <div>
                    <p className=' font-semibold text-lg'>Paxton</p>
                    <p className=' opacity-70'>April 5, 2023</p>
                </div>
            </div>
            <Rating value={4} name='half-rating' readOnly precision={1}/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta.</p>
        </Grid>
    </Grid>
    </>
  )
}

export default ProductReviewCard

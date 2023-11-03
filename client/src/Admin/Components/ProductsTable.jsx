import { Avatar, Button, Card, CardHeader, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, findProducts } from '../../State/Product/Action'
import { Select, MantineProvider, Grid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {Loader} from "../../Admin"
import deleteImage from "../../assets/deleteImage.json"
import Lottie from 'react-lottie';

const sortOptions = [
  { name: "Price: Low to High", label: "price_low_to_high" },
  { name: "Price: High to Low", label: "price_high_to_low" },
];

const filtersColor = [

  { name: "white", label: "white" },
  { name: "black", label: "black" },
  { name: "red", label: "red" },
  { name: "brown", label: "brown" },
  { name: "purple", label: "purple" },
  { name: "pink", label: "pink" },
  { name: "green", label: "green" },
  { name: "yellow", label: "yellow" },
  { name: "blue", label: "blue" },
];

const filterSize = [

  { name: "S", label: "S" },
  { name: "M", label: "M" },
  { name: "L", label: "L" },
  { name: "XL", label: "XL"},
  { name: "XXL", label: "XXL"},
]

const filterCategory = [

  { name: "Women Top", label: "womenTop" },
  { name: "Women T-shirt", label: "womenT-shirt" },
  { name: "Women Pants", label: "womenPant", },
  { name: "Women Sweaters", label: "womenSweaters", },
  { name: "Women Hoodies", label: "womenHoodies", },
  { name: "Women Jackets", label: "womenJackets", },
  { name: "Women Active wear", label: "womenActiveWear", },
  { name: "Women Casual wear", label: "womenCasualWear", },
  { name: "Women Formal wear", label: "womenFormalWear", },
  { name: "Women Business casual", label: "womenBusinessCasual", },
  { name: "Man T-shirt", label: "manT-shirt" },
  { name: "Man Pants", label: "manPant", },
  { name: "Man Sweaters", label: "manSweaters", },
  { name: "Man Hoodies", label: "manHoodies", },
  { name: "Man Jackets", label: "manJackets", },
  { name: "Man Active wear", label: "manActiveWear", },
  { name: "Man Casual wear", label: "manCasualWear", },
  { name: "Man Formal wear", label: "manFormalWear", },
  { name: "Man Business casual", label: "manBusinessCasual", },
]

const filterStock = [
  { label: "in_stock", name: "In Stock" },
  { label: "out_of_stock", name: "Out of Stock" },
]

const animationOptions = {
  loop: true,
  autoplay: true,
  animationData: deleteImage,
};



const ProductsTable = () => {

  const [selectedSortOption, setSelectedSortOption] = useState("")
  const dispatch = useDispatch()
  const { product } = useSelector((store) => store);
  const navigate = useNavigate()

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const sortValue = searchParams.get("sort");
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const CategoryValue = searchParams.get("category");
  const stock = searchParams.get("stock");
  const pageNumber = searchParams.get("page") || 1;


  useEffect(() => {
    const data = {
      category: CategoryValue || "",
      colors: colorValue || [],
      size: sizeValue || [],
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort: sortValue || "price_high_to_low",
      pageNumber: pageNumber,
      pageSize: 20,
      stock: stock,
    };
    dispatch(findProducts(data));
  }, [product.deletedProduct
    , sortValue
    , stock
    , colorValue, sizeValue
    , CategoryValue
    , pageNumber])

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId))
  }

  const handleStockOption = (selectedOption) => {
    setSelectedSortOption(selectedOption);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("stock", selectedOption);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleCategoryOption = (selectedOption) => {
    setSelectedSortOption(selectedOption);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("category", selectedOption);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleSizeOption = (selectedOption) => {
    setSelectedSortOption(selectedOption);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("size", selectedOption);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleColorOption = (selectedOption) => {
    setSelectedSortOption(selectedOption);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("color", selectedOption);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleSortOption = (selectedOption) => {
    setSelectedSortOption(selectedOption);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", selectedOption);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handlePaginationChange = (event, value) => {
    event.preventDefault();
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("page", value)
    const query = searchParams.toString();
    navigate({ search: `?${query}` })
  }

  const clearFilter = (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("sort");
    searchParams.delete("color");
    searchParams.delete("size");
    searchParams.delete("category");
    searchParams.delete("stock");
    // Set the selectedSortOption to an empty string
    setSelectedSortOption("");

    // Create the new query string with filters removed
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  }



  return (
    <>
      {
        product.loading === true ?
          (
            <Loader />
          ) :
          (
            <div className='md:p-5 space-y-5 overflow-x-auto'>
              <Card className='mt-2' sx={{ bgcolor: "#0c0c20", color: "#fff" }}>
                <div className='flex justify-between items-center'>
                  <CardHeader title="Filters" />
                  <p onClick={clearFilter} className=' cursor-pointer mr-5 text-red-500 hover:scale-90 duration-300'>Clear Filter</p>
                </div>
                <MantineProvider>

                  <Grid style={{ padding: "1rem" }}>
                    <Grid.Col span={{ base: 6, sm: 3 }}>
                      <Select
                        placeholder="Category"
                        data={filterCategory.map(option => ({ value: option.label, label: option.name }))}
                        value={selectedSortOption.label}
                        onChange={handleCategoryOption}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 6, sm: 3 }}>
                      <Select
                        placeholder="Sort"
                        data={sortOptions.map(option => ({ value: option.label, label: option.name }))}
                        value={selectedSortOption.label}
                        onChange={handleSortOption}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 4, sm: 2 }}>
                      <Select
                        placeholder="Color"
                        data={filtersColor.map(option => ({ value: option.label, label: option.name }))}
                        value={selectedSortOption.label}
                        onChange={handleColorOption}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 4, sm: 2 }}>
                      <Select
                        placeholder="Stock"
                        data={filterStock.map(option => ({ value: option.label, label: option.name }))}
                        value={selectedSortOption.label}
                        onChange={handleStockOption}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 4, sm: 2 }}>
                      <Select
                        placeholder="Size"
                        data={filterSize.map(option => ({ value: option.label, label: option.name }))}
                        value={selectedSortOption.label}
                        onChange={handleSizeOption}
                      />
                    </Grid.Col>
                  </Grid>
                </MantineProvider>
              </Card>

              {
                product?.products?.content?.length < 1 ?
                  (
                    <div className=' flex justify-center items-center text-white'>Unfortunately, no item was found</div>
                  ) :
                  (
                    <Card className='mt-2' sx={{ bgcolor: "#0c0c20", color: "#fff" }} >
                      <div className='flex justify-between'>
                        <CardHeader title="All Products" />
                        <CardHeader title={"Total " + product?.products?.content?.length} />
                      </div>

                      <TableContainer sx={{ bgcolor: "#0c0c20", color: "#fff" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ color: "#fff" }} align="left">S.no</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Image</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Title</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Color</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Size</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Category</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Price</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Quantity</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              product?.products?.content?.map((item, i) => (
                                <TableRow
                                  key={i}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell sx={{ color: "#fff" }} align="left">{i + 1}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left"><Avatar src={item?.imageUrl[0]?.image} /></TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{item?.title}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{item?.color}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{item?.size?.map((item) => item.name + " ")}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{item?.category?.name}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{item?.price}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{item?.quantity}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">
                                    <div className=' hover:scale-75 duration-300' onClick={() => handleProductDelete(item?._id)} >
                                      <Lottie options={animationOptions} height={50} width={50} />
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <section>
                        <div className="pt-5 flex justify-center items-center">
                          <Pagination sx={{ bgcolor: "#fff", padding: "0.5rem", width: 1, display: "flex", justifyContent: "center", alignItems: "center" }} color='primary' variant="outlined" shape="rounded" count={product.products?.totalPages}
                            onChange={handlePaginationChange}
                          />
                        </div>
                      </section>
                    </Card>
                  )
              }
            </div>
          )
      }
    </>
  )
}

export default ProductsTable

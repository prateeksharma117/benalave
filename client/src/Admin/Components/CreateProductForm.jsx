import { Button, Card, CardHeader } from '@mui/material'
import {useState } from 'react'
import { useDispatch } from "react-redux"
import { MantineProvider, Grid, Container, TextInput, Tooltip, Textarea } from '@mantine/core';
import { createProduct } from '../../State/Product/Action';
import {MdDelete} from "react-icons/md"
import {AiOutlineCloudUpload} from "react-icons/ai"





const CreateProductForm = () => {

  const [imageURLs, setImageURLs] = useState([{ image: "" }]);
  const [highlights, setHighlights] = useState([{ text: "" }]);
  const [size, setSize] = useState([{ name: "", quantity: 0 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(event.currentTarget);
    const productData = {
      imageUrl: imageURLs,
      title: data.get("title"),
      brand: data.get("brand"),
      color: data.get("color"),
      quantity: data.get("quantity"),
      price: data.get("price"),
      highlights: highlights,
      size: size,
      discountedPrice: data.get("discountedPrice"),
      discountedPercent: data.get("discountedPercent"),
      category: data.get("category"),
      description: data.get("description"),
    }

    const newErrors = {};
    if (productData.imageUrl.length < 3) {
      newErrors.imageUrl = "Minimum three images are required";
    }
    if (productData.highlights.length < 4) {
      newErrors.highlights = "Minimum four highlights are required";
    }
    if (productData.size.length < 1) {
      newErrors.size = "Size is required";
    }
    if (!productData.title) {
      newErrors.title = "Title is required";
    }
    if (!productData.brand) {
      newErrors.brand = "brand is required";
    }
    if (!productData.color) {
      newErrors.color = "color is required";
    }
    if (!productData.quantity) {
      newErrors.quantity = "quantity is required";
    }
    if (!productData.price) {
      newErrors.price = "price is required";
    }
    if (!productData.discountedPrice) {
      newErrors.discountedPrice = "discountedPrice is required";
    }
    if (!productData.discountedPercent) {
      newErrors.discountedPercent = "discountedPercent is required";
    }
    if (!productData.category) {
      newErrors.category = "category is required";
    }
    if (!productData.description) {
      newErrors.description = "description is required";
    }


    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }


    dispatch(createProduct({ data: productData, jwt }))
    setTimeout(() => {
      setIsSubmitting(false);
    }, 5000);

    setErrors({});
    setImageURLs([{ image: "" }]);
    setHighlights([{ text: "" }]);
    setSize([{ name: "", quantity: 0 }]);
    event.target.reset()


  }



  const handleAddImage = () => {
    setImageURLs([...imageURLs, { image: "" }]);
  };

  const handleImageChange = (url, index) => {
    const newImageURLs = [...imageURLs];
    newImageURLs[index] = { image: url };
    setImageURLs(newImageURLs);
  };

  const handleRemoveImage = (index) => {
    const newImageURLs = [...imageURLs];
    newImageURLs.splice(index, 1);
    setImageURLs(newImageURLs);
  };

  const addHighlight = () => {
    setHighlights([...highlights, { text: "" }]);
  };

  const handleHighlightChange = (value, index) => {
    const newHighlights = [...highlights];
    newHighlights[index] = { text: value };
    setHighlights(newHighlights);
  };

  const removeHighlight = (index) => {
    const newHighlights = [...highlights];
    newHighlights.splice(index, 1);
    setHighlights(newHighlights);
  };

  const addSize = () => {
    setSize([...size, { name: "", quantity: 0 }]);
  };

  const handleSizeChange = (index, field, value) => {
    const newSize = [...size];
    newSize[index][field] = value;
    setSize(newSize);
  };

  const removeSize = (index) => {
    const newSize = [...size];
    newSize.splice(index, 1);
    setSize(newSize);
  };



  return (
    <>
      <MantineProvider>
        <div className='md:p-5 space-y-5 overflow-x-auto'>
          <Card sx={{ bgcolor: "#0c0c20", color: "#fff" }}>
            <div className='flex justify-center'>
              <CardHeader title="Add New Product" />
            </div>
          </Card>

          <form onSubmit={handleSubmit}>
            <Card className='mt-2' sx={{ bgcolor: "#0c0c20", color: "#fff" }}>
              <div className='flex justify-between items-center'>
                <CardHeader title="Product Image" />
                <p className=' text-green-400 pr-5 cursor-pointer hover:scale-90 duration-300' onClick={handleAddImage}>
                  Add Image
                </p>
              </div>
              <div>


                <Grid style={{ paddingBottom: "1rem" }}>
                  {imageURLs.map((url, index) => (
                    <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                      <Container>
                        <div>
                          <TextInput
                            size='lg'
                            variant="filled"
                            placeholder="Product Image"
                            error={errors.imageUrl}
                            value={url.image}
                            onChange={(event) => handleImageChange(event.target.value, index)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            inputContainer={(children) => (
                              <Tooltip label="It is necessary to upload at least 3 images" position="top-start" opened={focused}>
                                {children}
                              </Tooltip>
                            )}
                            rightSection={
                              <Button onClick={() => handleRemoveImage(index)} variant="link">
                                <MdDelete size={30} color='#e34d4d'/>
                              </Button>
                            }
                          />
                        </div>
                      </Container>
                    </Grid.Col>
                  ))}
                </Grid>
              </div>
            </Card>

            <Card className='mt-2' sx={{ bgcolor: "#0c0c20", color: "#fff" }}>
              <div>
                <CardHeader title="Product Details" />
              </div>
              <div>
                <Grid style={{ padding: "1rem" }}>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      placeholder='Product Title'
                      size='lg'
                      name='title'
                      error={errors.title}
                      variant="filled"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      size='lg'
                      variant="filled"
                      placeholder='Product Brand'
                      name='brand'
                      error={errors.brand}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      size='lg'
                      variant="filled"
                      placeholder="Product Color"
                      name='color'
                      error={errors.color}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      size='lg'
                      type='number'
                      variant="filled"
                      placeholder='Product Quantity'
                      name='quantity'
                      error={errors.quantity}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      size='lg'
                      type='number'
                      variant="filled"
                      placeholder='Product Price'
                      name='price'
                      error={errors.price}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      size='lg'
                      type='number'
                      variant="filled"
                      placeholder='Product Discounted Price'
                      name='discountedPrice'
                      error={errors.discountedPrice}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      size='lg'
                      type='number'
                      variant="filled"
                      placeholder='Product Discounted Percent'
                      name='discountedPercent'
                      error={errors.discountedPercent}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      size='lg'
                      variant="filled"
                      placeholder="Product Category"
                      name='category'
                      error={errors.category}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <Textarea
                      size='lg'
                      variant="filled"
                      aria-multiline
                      autosize
                      minRows={4}
                      placeholder="Product Description"
                      name='description'
                      error={errors.description}
                    />
                  </Grid.Col>

                </Grid>
              </div>
            </Card>

            <Card className='mt-2' sx={{ bgcolor: "#0c0c20", color: "#fff" }}>
              <div className='flex justify-between items-center'>
                <CardHeader title="Product Highlights" />
                <p className=' text-green-400 pr-5 cursor-pointer hover:scale-90 duration-300' onClick={addHighlight}>
                  Add Highlights
                </p>
              </div>
              <div>


                <Grid style={{ paddingBottom: "1rem" }}>
                  {highlights.map((highlight, index) => (
                    <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                      <Container>
                        <div>
                          <TextInput
                            size='lg'
                            variant="filled"
                            placeholder="Product Highlights"
                            error={errors.highlights}
                            onChange={(event) => handleHighlightChange(event.target.value, index)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            inputContainer={(children) => (
                              <Tooltip label="It is necessary to write at least 4 highlights" position="top-start" opened={focused}>
                                {children}
                              </Tooltip>
                            )}
                            rightSection={
                              <Button onClick={() => removeHighlight(index)} variant="link">
                                <MdDelete size={30} color='#e34d4d'/>
                              </Button>
                            }
                          />
                        </div>
                      </Container>
                    </Grid.Col>
                  ))}
                </Grid>
              </div>
            </Card>

            <Card className='mt-2' sx={{ bgcolor: "#0c0c20", color: "#fff" }}>
              <div className='flex justify-between items-center'>
                <CardHeader title="Product Size" />
                <p className=' text-green-400 pr-5 cursor-pointer hover:scale-90 duration-300' onClick={addSize}>
                  Add Size
                </p>
              </div>


              {size.map((sizeData, index) => (
                <Grid key={index} style={{ padding: "1rem" }}>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      placeholder='Product Size'
                      error={errors.size}
                      size='lg'
                      variant="filled"
                      onChange={(event) => handleSizeChange(index, "name", event.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      placeholder='Size Quantity'
                      size='lg'
                      type='number'
                      variant="filled"
                      onChange={(event) => handleSizeChange(index, "quantity", event.target.value)}
                      rightSection={
                        <Button onClick={() => removeSize(index)} variant="link">
                          <MdDelete size={30} color='#e34d4d'/>
                        </Button>
                      }
                    />
                  </Grid.Col>
                </Grid>
              ))}


            </Card>

            <div className='pt-10 pb-2'>
              {isSubmitting && !Object.keys(errors).length > 0 ?
                <Button sx={{ width: "100%" }} variant='contained'>Uploading... <AiOutlineCloudUpload color='white' size={25} style={{marginLeft:"10px"}}/></Button>
                :
                <Button type='submit' sx={{ width: "100%" }} variant='contained'>ADD Product</Button>
              }
            </div>
          </form>
        </div>
      </MantineProvider>
    </>
  )
}

export default CreateProductForm

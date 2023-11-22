import { Grid, Container, TextInput, Tooltip, MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardHeader } from '@mui/material'
import { MdDelete } from "react-icons/md"
import { carouselImage, getCarouselImage } from '../../State/Carousel/Action';


const CarouselImage = () => {

    const dispatch = useDispatch();
    const { carousel } = useSelector((store) => store);
    const [carouselImages, setCarouselImages] = useState(carousel?.Carousel?.map((image) => ({ image: image?.image })));
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        dispatch(getCarouselImage())
    }, [])


    const handleCarouselImageChange = (url, index) => {
        const updatedImages = [...carouselImages];
        updatedImages[index] = { image: url};
        setCarouselImages(updatedImages);
    };

    const addCarouselImage = () => {
        setCarouselImages([...carouselImages, { image: '' }]);
    };

    const removeCarouselImage = (index) => {
        const updatedImages = carouselImages.filter((_, i) => i !== index);
        setCarouselImages(updatedImages);
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        setEditing(false);
        dispatch(carouselImage(carouselImages))
    };

    return (
        <>
            <MantineProvider>
                <Card className='mt-2' sx={{ bgcolor: "#0c0c20", color: "#fff" }}>
                    <div className='flex justify-between items-center'>
                        <CardHeader title="Carousel Images" />
                        <div className=' flex'>
                            {editing ? <p className='text-green-400 pr-5 cursor-pointer hover:scale-90 duration-300' onClick={addCarouselImage}>
                                Add Image
                            </p> : ""}

                            {!editing ? <p className='text-green-400 pr-5 cursor-pointer hover:scale-90 duration-300' onClick={handleEditClick}>
                                Edit
                            </p> : <p className='text-green-400 pr-5 cursor-pointer hover:scale-90 duration-300' onClick={handleSaveClick}>
                                Save
                            </p>}
                        </div>
                    </div>
                    <div>
                        <Grid style={{ paddingBottom: "1rem" }}>
                            {carouselImages?.map((imageUrl, index) => (
                                <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                                    <Container>
                                        <div>
                                            <TextInput
                                                size='lg'
                                                variant="filled"
                                                placeholder="Carousel Image URL"
                                                value={imageUrl?.image}
                                                onChange={(event) => handleCarouselImageChange(event.target.value, index)}
                                                rightSection={
                                                    <Button onClick={() => removeCarouselImage(index)} disabled={!editing} variant="link">
                                                        <MdDelete size={30} color='#e34d4d' />
                                                    </Button>
                                                }
                                                disabled={!editing}
                                            />
                                        </div>
                                    </Container>
                                </Grid.Col>
                            ))}
                        </Grid>
                    </div>
                </Card>
            </MantineProvider>
        </>
    )
}

export default CarouselImage

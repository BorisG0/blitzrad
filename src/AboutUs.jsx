import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export function AboutUs(){
      return (
          <>
            <div> Unsere Produkte </div>
            <MyImageList/>
          </>
      )
    }


    function MyImageList(){
        return (
            <ImageList cols={3} gap={10} >
              {itemData.map((item) => (
                <ImageListItem key={item.img} >
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.vehicle}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.vehicle}
                    subtitle={<span> Price: {item.price}</span>}
                    position="below"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          );
    }
    const itemData = [
      {
        img: 'https://cdn.pixabay.com/photo/2013/07/13/13/43/racing-bicycle-161449_960_720.png',
        vehicle: 'Bicycle',
        price: '15€/day',
      },
      {
        img: 'https://cdn.pixabay.com/photo/2021/07/31/19/36/electric-scooters-6512899_960_720.jpg',
        vehicle: 'Scooter',
        price: '20€/day',
      },
      {
        img: 'https://cdn.pixabay.com/photo/2016/07/20/20/46/electric-mountain-bike-1531262_960_720.jpg',
        vehicle: 'E-Bike',
        price: '25€/day',
      },
    ];


    


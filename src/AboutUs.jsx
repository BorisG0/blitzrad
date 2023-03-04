import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export function AboutUs(){
      return (
          <>
            <ProdcutImageList/>
            <BasicInformation/>
            <Founder/>
          </>
      )
    }
    function Founder(){
        const matches = useMediaQuery('(min-width:1200px)');

        return(
            <>
                <h1>Unser Vorstand</h1>
                <ImageList variant="masonry" cols={matches ? 2 : 1} >
              {founderData.map((item) => (
                <ImageListItem key={item.img} >
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.name}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={<p> {item.background} </p>}
                    position="below"
                  />
                </ImageListItem>
              ))}
            </ImageList>
            </>
        )
    }
    const founderData = [
        {
          img: 'https://cdn.pixabay.com/photo/2017/07/11/18/59/mentor-2494673_960_720.jpg',
          name: 'Thomas Müller',
          background:
          <>
            Hi, ich bin Thomas, 42 Jahre alt und Gründer von Blitzrad. <br/>
            Ich bin begeistert von dem was unser Team in so kurzer Zeit aufgebaut hat und bin davon überzeugt,<br/>
            dass Blitzrad noch eine große Zukunft hat.
            </>,
        },
        {
          img: 'https://cdn.pixabay.com/photo/2017/09/16/17/42/business-woman-2756210_960_720.jpg',
          name: 'Nadine Bauer',
          background:
          <>
            Hi, ich bin Ndine, 32 Jahre alt und bin erst zwei Jahre nach der Gründung bei Blitzrad eingestiegen. <br/>
            Ich war von dem Geschäftsmodell überzeugt und wollte die damals noch sehr kleine Firma unterstüzen. <br/>
            Zusammen mit Thomas leite ich die Firma.
            </>,
        },
    ]
function BasicInformation(){
    return(
        <>
            <h1>Unsere Mission</h1>
            <p style={{paddingLeft: "8rem", paddingRight: "8rem" }}> Wir wollen jedem die Mobilität anbieten die er braucht. Und das zu einem fairen Preis.
                Das Mobilitätserlebnis soll für unsere Kunden perfekt sein. Also wenn ihr irgendwelche Wünsche habt,
                könnt ihr euch gerne bei uns melden. Aktuell probieren wir unsere Flotte zu erweitern und
                mehr Standorte zu eröffnen. Melde dich, wenn wir auch in deine Gegend kommen sollen.  </p>
        </>
    )
}

    function ProdcutImageList(){
        const matches = useMediaQuery('(min-width:600px)');

        return (
            <>
            <h1> Unsere Produkte </h1>
            <ImageList cols={matches ? 3 : 1} gap={10} >
              {productData.map((item) => (
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
            </>
          );
    }
    const productData = [
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


    


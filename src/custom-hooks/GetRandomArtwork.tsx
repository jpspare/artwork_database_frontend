import { useEffect, useState } from "react";

type artworkArray = {
    id: number,
    title: string,
    artist_title: string,
    image_id: string,
    date_display: number,
    medium_display: string,
    place_of_origin: string,
    thumbnail: {
        "alt_text": string,
        "width": number,
        "height": number,
        "lqip": string
    }
};

const initialArtArray: artworkArray = {
    "id": 129884,
    "title": "Starry Night and the Astronauts",
    "artist_title": "Alma Thomas",
    "image_id": "e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9",
    "date_display": 1972,
    "medium_display": "Acrylic on canvas",
    "place_of_origin": "United States",
    "thumbnail": {
        "alt_text": "",
        "width": 5376,
        "height": 6112,
        "lqip": ""
    },
};

export const getRandomArtwork = () => {
    const [artwork, setArtwork] = useState(initialArtArray);
    
    let timeStamp = Math.floor(Date.now() / 1000);
    let artworkRequestBody = {
        'resources': "artworks",
        'fields': [
            "id",
            "title",
            "artist_title",
            "image_id",
            "date_display",
            "medium_display",
            "place_of_origin",
            "thumbnail"
        ],
        'boost': false,
        'limit': 1,
        'query': {
            'function_score': {
                'query': {
                    'bool': {
                        'filter': [
                            {
                                'term': {
                                    'is_public_domain': true
                                },
                            },
                            {
                                'exists': {
                                    'field': "image_id",
                                },
                            },
                        ],
                    },
                },
                'boost_mode': "replace",
                'random_score': {
                    'field': "id",
                    'seed': timeStamp
                }
            }
        }
    };

    async function fetchArtwork (
            url='https://api.artic.edu/api/v1/search', 
            data=artworkRequestBody) {
        const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'AIC-User-Agent': 'aic-bash (jpspare@gmail.com)'
                },
                body: JSON.stringify(data),
            });
        const ArtData = await response.json();
        setArtwork({
            "id": ArtData.data[0].id,
            "title": ArtData.data[0].title,
            "artist_title": ArtData.data[0].artist_title,
            "image_id": ArtData.data[0].image_id,
            "date_display": ArtData.data[0].date_display,
            "medium_display": ArtData.data[0].medium_display,
            "place_of_origin": ArtData.data[0].place_of_origin,
            "thumbnail": {
                "alt_text": ArtData.data[0].thumbnail.alt_text,
                "width": ArtData.data[0].thumbnail.width,
                "height": ArtData.data[0].thumbnail.height,
                "lqip": ArtData.data[0].thumbnail.lqip
            }
        });
    };

    useEffect( () => {
        fetchArtwork();
    }, [])

  return { artwork }
} 

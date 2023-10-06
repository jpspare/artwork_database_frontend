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
}

const initialArtArray: artworkArray = {
    "id": 0,
    "title": "",
    "artist_title": "",
    "image_id": "",
    "date_display": 0,
    "medium_display": "",
    "place_of_origin": "",
    "thumbnail": {
        "alt_text": "",
        "width": 0,
        "height": 0,
        "lqip": ""
    },
}

export const ArtworkSearch = (search_value: string) => {
    const [ artData, setArtData ] = useState(initialArtArray);

    let artworkRequestBody = {
        'resources': "artworks",
        'q': search_value,
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
        'boost': true,
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
            }
        }
    };

    async function searchForArtwork (
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
        const ResponseData = await response.json();
        setArtData({
            "id": ResponseData.data[0].id,
            "title": ResponseData.data[0].title,
            "artist_title": ResponseData.data[0].artist_title,
            "image_id": ResponseData.data[0].image_id,
            "date_display": ResponseData.data[0].date_display,
            "medium_display": ResponseData.data[0].medium_display,
            "place_of_origin": ResponseData.data[0].place_of_origin,
            "thumbnail": {
                "alt_text": ResponseData.data[0].thumbnail.alt_text,
                "width": ResponseData.data[0].thumbnail.width,
                "height": ResponseData.data[0].thumbnail.height,
                "lqip": ResponseData.data[0].thumbnail.lqip
            }
        });
    };

    useEffect( () => {
        searchForArtwork();
    }, [search_value])

  return (
    { artData }
  )
}

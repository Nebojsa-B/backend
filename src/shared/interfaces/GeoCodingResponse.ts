export interface GeoCodingResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    house_number: string;
    road: string;
    city_district: string;
    city: string;
    county: string;
    ISO3166_2_lvl6: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
}
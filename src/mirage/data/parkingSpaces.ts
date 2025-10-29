import type { ParkingSpace } from '../types';

// Real London parking locations with accurate coordinates
export const parkingSpaces: ParkingSpace[] = [
  {
    id: "1",
    name: "King's Cross Station Car Park",
    address: "Euston Road, King's Cross, London, N1 9AL",
    lat: 51.5301,
    lng: -0.1239,
    price: 32.00,
    features: ["24/7", "CCTV", "Covered", "Accessible"]
  },
  {
    id: "2",
    name: "Angel Central Car Park",
    address: "21 Parkfield Street, Islington, London, N1 0PS",
    lat: 51.5327,
    lng: -0.1059,
    price: 25.00,
    features: ["EV Charging", "Covered", "24/7", "CCTV"]
  },
  {
    id: "3",
    name: "Upper Street Parking",
    address: "45 Upper Street, Islington, London, N1 0PN",
    lat: 51.5416,
    lng: -0.1031,
    price: 15.00,
    features: ["24/7", "CCTV", "Well Lit"]
  },
  {
    id: "4",
    name: "Old Street Station Car Park",
    address: "1 Old Street, London, EC1V 9HL",
    lat: 51.5255,
    lng: -0.0879,
    price: 28.50,
    features: ["CCTV", "Well Lit", "Accessible"]
  },
  {
    id: "5",
    name: "Caledonian Road Driveway",
    address: "12 Caledonian Road, London, N1 9DU",
    lat: 51.5301,
    lng: -0.1151,
    price: 18.00,
    features: ["CCTV", "Well Lit"]
  },
  {
    id: "6",
    name: "City Road Secure Parking",
    address: "100 City Road, London, EC1Y 2BJ",
    lat: 51.5252,
    lng: -0.0876,
    price: 22.00,
    features: ["24/7", "CCTV", "Covered"]
  },
  {
    id: "7",
    name: "Finsbury Park Car Park",
    address: "Finsbury Park Station, Station Place, London, N4 2DH",
    lat: 51.5643,
    lng: -0.1065,
    price: 19.50,
    features: ["CCTV", "Well Lit", "24/7"]
  },
  {
    id: "8",
    name: "Highbury Corner Parking",
    address: "Highbury Corner, London, N5 1RD",
    lat: 51.5479,
    lng: -0.0991,
    price: 16.00,
    features: ["CCTV", "Accessible"]
  },
  {
    id: "9",
    name: "Holloway Road Premium Parking",
    address: "305 Holloway Road, London, N7 8DQ",
    lat: 51.5559,
    lng: -0.1153,
    price: 20.00,
    features: ["EV Charging", "CCTV", "Covered"]
  },
  {
    id: "10",
    name: "Essex Road Station Parking",
    address: "Essex Road, London, N1 2SX",
    lat: 51.5399,
    lng: -0.1041,
    price: 17.50,
    features: ["24/7", "Well Lit"]
  },
  {
    id: "11",
    name: "Farringdon Station Car Park",
    address: "Cowcross Street, London, EC1M 6BY",
    lat: 51.5203,
    lng: -0.1053,
    price: 35.00,
    features: ["24/7", "CCTV", "Covered", "EV Charging"]
  },
  {
    id: "12",
    name: "Clerkenwell Secure Parking",
    address: "30 Clerkenwell Road, London, EC1M 5PS",
    lat: 51.5227,
    lng: -0.1048,
    price: 26.00,
    features: ["CCTV", "Covered", "Accessible"]
  },
  {
    id: "13",
    name: "Shoreditch High Street Parking",
    address: "Shoreditch High Street, London, E1 6JE",
    lat: 51.5234,
    lng: -0.0753,
    price: 24.00,
    features: ["24/7", "CCTV", "Well Lit"]
  },
  {
    id: "14",
    name: "Barbican Car Park",
    address: "Silk Street, London, EC2Y 8DS",
    lat: 51.5202,
    lng: -0.0937,
    price: 30.00,
    features: ["24/7", "Covered", "CCTV", "Accessible"]
  },
  {
    id: "15",
    name: "Moorgate Station Parking",
    address: "Moorgate, London, EC2M 6TX",
    lat: 51.5186,
    lng: -0.0886,
    price: 33.00,
    features: ["24/7", "CCTV", "EV Charging"]
  },
  {
    id: "16",
    name: "Liverpool Street Car Park",
    address: "Liverpool Street, London, EC2M 7QN",
    lat: 51.5179,
    lng: -0.0823,
    price: 38.00,
    features: ["24/7", "Covered", "CCTV", "EV Charging", "Accessible"]
  },
  {
    id: "17",
    name: "Bethnal Green Parking",
    address: "Cambridge Heath Road, London, E2 9PA",
    lat: 51.5273,
    lng: -0.0559,
    price: 14.00,
    features: ["CCTV", "Well Lit"]
  },
  {
    id: "18",
    name: "Hoxton Square Parking",
    address: "Hoxton Square, London, N1 6NU",
    lat: 51.5280,
    lng: -0.0825,
    price: 21.00,
    features: ["24/7", "CCTV"]
  },
  {
    id: "19",
    name: "Dalston Junction Parking",
    address: "Dalston Lane, London, E8 3DF",
    lat: 51.5461,
    lng: -0.0750,
    price: 16.50,
    features: ["CCTV", "Well Lit", "Accessible"]
  },
  {
    id: "20",
    name: "Canonbury Station Parking",
    address: "Canonbury Road, London, N1 2DG",
    lat: 51.5483,
    lng: -0.0891,
    price: 18.50,
    features: ["24/7", "CCTV"]
  }
];
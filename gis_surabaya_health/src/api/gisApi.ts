import axios from 'axios';
import type { AnalysisData, FacilityData, GeoJsonData } from '../types';

const BASE_URL = import.meta.env.BASE_URL || '/';

export const fetchAnalysis = async (): Promise<AnalysisData[]> => {
  const response = await axios.get(`${BASE_URL}data/clean/analysis.json`);
  return response.data;
};

export const fetchGeoJson = async (): Promise<GeoJsonData> => {
  const response = await axios.get(`${BASE_URL}data/clean/surabaya_kecamatan.geojson`);
  return response.data;
};

export const fetchFaskes = async (): Promise<FacilityData[]> => {
  const response = await axios.get(`${BASE_URL}data/clean/faskes.json`);
  return response.data;
};

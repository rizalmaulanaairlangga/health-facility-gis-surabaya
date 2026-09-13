-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.faskes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  kecamatan_id bigint NOT NULL,
  jenis_faskes_id bigint NOT NULL,
  tahun integer NOT NULL,
  jumlah integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT faskes_pkey PRIMARY KEY (id),
  CONSTRAINT faskes_kecamatan_id_fkey FOREIGN KEY (kecamatan_id) REFERENCES public.kecamatan(id),
  CONSTRAINT faskes_jenis_faskes_id_fkey FOREIGN KEY (jenis_faskes_id) REFERENCES public.jenis_faskes(id)
);
CREATE TABLE public.jenis_faskes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nama character varying NOT NULL UNIQUE,
  bobot numeric NOT NULL DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT jenis_faskes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.kecamatan (
  id bigint NOT NULL DEFAULT nextval('kecamatan_id_seq'::regclass),
  nama_kecamatan character varying NOT NULL,
  geom USER-DEFINED,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT kecamatan_pkey PRIMARY KEY (id)
);
CREATE TABLE public.penduduk (
  id bigint NOT NULL DEFAULT nextval('penduduk_id_seq'::regclass),
  kecamatan_id bigint NOT NULL,
  tahun integer NOT NULL,
  jumlah_penduduk integer NOT NULL,
  persentase numeric,
  kepadatan numeric,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT penduduk_pkey PRIMARY KEY (id),
  CONSTRAINT penduduk_kecamatan_id_fkey FOREIGN KEY (kecamatan_id) REFERENCES public.kecamatan(id)
);
CREATE TABLE public.spatial_ref_sys (
  srid integer NOT NULL CHECK (srid > 0 AND srid <= 998999),
  auth_name character varying,
  auth_srid integer,
  srtext character varying,
  proj4text character varying,
  CONSTRAINT spatial_ref_sys_pkey PRIMARY KEY (srid)
);